import {Entity, Column} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Base } from "./base";

@Entity()
export class User extends Base {
    @Column({ type: 'varchar', unique: true })
    @Length(4, 20)
    username: string;

    @Column({ type: 'varchar' })
    @Length(4, 100)
    password: string;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    role: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
