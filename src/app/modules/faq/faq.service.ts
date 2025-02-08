import { IFaq } from "./faq.interface";
import { FaqModel } from "./faq.model";

export const createFaq = async (faqData: IFaq) => {
    const faq = new FaqModel(faqData);
    return await faq.save();
};


export const getAllFaqs = async () => {
    return await FaqModel.find();
};


// Get a single FAQ by its ID
export const getFaqById = async (id: string) => {
    return await FaqModel.findById(id);
};

// Update an existing FAQ
export const updateFaq = async (id: string, faqData: Partial<IFaq>) => {
    return await FaqModel.findByIdAndUpdate(id, faqData, { new: true });
};

// Delete an FAQ
export const deleteFaq = async (id: string) => {
    return await FaqModel.findByIdAndDelete(id);
};