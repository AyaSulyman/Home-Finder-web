import Category from "../models/category.model";



export const createCategory = async (
    data: any
) => {


    const category =
        await Category.create(data);


    return category;

};





export const getCategories = async () => {


    const categories =
        await Category.find()
        .sort({
            createdAt: -1
        });


    return categories;

};