import { Request, Response } from "express";
import { Between, getRepository } from "typeorm";
import { validate } from "class-validator";
import { StandardError } from '../utils/standard_error_code';

import { Journal } from "../entities/journal";

class JournalController {
    static getJournals = async (req: Request, res: Response) => {    
        //Get journals from database
        const journalRepository = getRepository(Journal);
        
        const journals = await journalRepository.find({
            where: {
                created: Between(req.query.from || "1949-01-01 00:00:00.000",
                    req.query.to || "2999-01-01 00:00:00.000")
            },
            order: { created: "DESC" },
            take: <number>parseInt(<string>req.query.limit) || 100
        });
    
        //Send the journals object
        res.send(journals);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: string = req.params.id;
    
        //Get the journal from database
        const journalRepository = getRepository(Journal);
        try {
          const journal = await journalRepository.findOneOrFail(id);
          res.send(journal);
        } catch (error) {
          res.status(404).send(new StandardError('JOURNAL_NOT_FOUND', 'Journal with this id is not found').generateAPIResponse());
        }
    };

    static newJournal = async (req: Request, res: Response) => {
        //Get parameters from the body
        const { note, date, category, is_achieved } = req.body;
        const journal = new Journal();
        journal.note = note;
        journal.category = category;
        journal.date = date;
        journal.is_achieved = is_achieved;
    
        //Validade if the parameters are ok
        const errors = await validate(journal);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
    
        //Try to save
        const journalRepository = getRepository(Journal);
        try {
          await journalRepository.save(journal);
        } catch (e) {
          res.status(500).send(new StandardError('CREATE_JOURNAL_ERROR', 'Create journal error').generateAPIResponse());
          return;
        }
    
        //If all ok, send 201 response
        res.status(201).send(journal);
    };

    static editJournal = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
    
        //Get values from the body
        const { note, date, category, is_achieved } = req.body;
    
        //Try to find journal on database
        const journalRepository = getRepository(Journal);
        let journal;
        try {
          journal = await journalRepository.findOneOrFail(id);
        } catch (error) {
          //If not found, send a 404 response
          res.status(404).send(new StandardError('JOURNAL_NOT_FOUND', 'Journal with this id is not found').generateAPIResponse());
          return;
        }
    
        //Validate the new values on model
        journal.note = note;
        journal.category = category;
        journal.date = date;
        journal.is_achieved = is_achieved;
        const errors = await validate(journal);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
    
        //Try to safe
        try {
          await journalRepository.save(journal);
        } catch (e) {
          res.status(500).send(new StandardError('CREATE_JOURNAL_ERROR', 'Create journal error').generateAPIResponse());
          return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(201).send(journal);
      };
    
      static deleteJournal = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
    
        const journalRepository = getRepository(Journal);
        try {
          await journalRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send(new StandardError('JOURNAL_NOT_FOUND', 'Journal with this id is not found').generateAPIResponse());
          return;
        }
        journalRepository.delete(id);
    
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };
}

export default JournalController;