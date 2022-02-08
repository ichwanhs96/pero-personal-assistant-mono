import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn} from "typeorm";

export abstract class Base {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;

    @VersionColumn()
    version: number;
}