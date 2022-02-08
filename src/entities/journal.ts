import {Entity, Column} from "typeorm";
import { IsNotEmpty, IsEnum } from "class-validator";
import { Base } from "./base";
import {JournalCategory} from "./enums/journal_category";

@Entity()
export class Journal extends Base {
    @Column({ type: 'varchar' })
    @IsNotEmpty()
    note: string;

    @Column({ type: 'timestamp', nullable: true })
    date: Date;

    @Column({ type: 'boolean', default: false })
    is_achieved: boolean;

    @Column({ type: 'enum', enum: JournalCategory, default: JournalCategory.TODO })
    @IsEnum(JournalCategory)
    category: string;
}
