import {MigrationInterface, getRepository} from "typeorm";
import { User } from "../entities/user";

export class CreateAdminUser1644165851201 implements MigrationInterface {

    public async up(): Promise<void> {
        const user = new User();
        user.username = "ichone";
        user.password = "ichone";
        user.hashPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(): Promise<void> {
        // Do nothing
    }

}
