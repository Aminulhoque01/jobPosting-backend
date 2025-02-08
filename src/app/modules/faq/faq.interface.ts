// src/interfaces/faq.interface.ts
export interface IFaq {
    question: string; // The FAQ question
    answer: string;   // The FAQ answer
    category?: string; // Optional category for grouping similar questions
    createdAt?: Date;  // Optional creation date
    updatedAt?: Date;
    createdDate?: string
   // Optional update date
}
