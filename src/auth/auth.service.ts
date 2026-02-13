import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Auth } from "./entities/auth.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aziazi22t@gmail.com",
      pass: process.env.APP_KEY,
    },
  });

  async register(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { username, email, password } = createAuthDto;

    const foundedUser = await this.authModel.findOne({
      where: { email },
    });

    if (foundedUser) throw new BadRequestException("user already exists");

    const hashPassword = await bcrypt.hash(password, 16);

    const code = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");

    await this.transporter.sendMail({
      from: "aziazi22t@gmail.com",
      to: email,
      subject: "Otp",
      text: "simple",
      html: `<b>Hello World ${code}<b>`,
    });

    return await this.authModel.create({
      username,
      email,
      password: hashPassword,
    });
  }

    async login(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { username, email, password } = createAuthDto;

    const foundedUser = await this.authModel.findOne({
      where: { email },
    });

    if (foundedUser) throw new BadRequestException("user already exists");

    const hashPassword = await bcrypt.hash(password, 16);

    const code = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");

    await this.transporter.sendMail({
      from: "aziazi22t@gmail.com",
      to: email,
      subject: "Otp",
      text: "simple",
      html: `<b>Hello World ${code}<b>`,
    });

    return await this.authModel.create({
      username,
      email,
      password: hashPassword,
    });
  }

  async findAll(): Promise<Auth[]> {
    return await this.authModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number): Promise<boolean> {
    const newID = Number(id);

    const user = await this.authModel.findByPk(newID);

    if (!user) throw new NotFoundException("user not found");

    // await this.authModel.destroy({ where: { id: Number(id) } });
    await user.destroy();

    return true;
  }
}
