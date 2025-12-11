import { westAfricanIngredients, japaneseIngredients, cookingStyles, fastFoodStyles } from '../data/ingredients';

export function generateCombo(mode = 'dish') {
    const waBase = getRandom(westAfricanIngredients);
    const jpBase = getRandom(japaneseIngredients);

    // Ensure we don't just get two "spices" or two "bases" if we can help it, 
    // but pure random is also fun. Let's try to pick 3 items: 
    // 1 West African, 1 Japanese, and 1 Random extra from either.
    const extraPool = [...westAfricanIngredients, ...japaneseIngredients].filter(
        i => i.name !== waBase.name && i.name !== jpBase.name
    );
    const extra = getRandom(extraPool);

    let style, title, description;

    if (mode === 'fast-food') {
        style = getRandom(fastFoodStyles);
        title = `${waBase.name} & ${jpBase.name} ${style}`;
        description = `A quick ${style} filled with ${waBase.name} and ${jpBase.name}, flavored with ${extra.name}.`;
    } else {
        style = getRandom(cookingStyles);
        title = `${waBase.name} & ${jpBase.name}`;
        description = `${style} ${waBase.name} infused with ${jpBase.name} notes, finished with ${extra.name}.`;
    }

    // Calculate Nutrition (Sum of component parts)
    const ingredientsList = [waBase, jpBase, extra];
    const totalNutrition = ingredientsList.reduce((acc, curr) => {
        const nut = curr.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0 };
        return {
            calories: acc.calories + nut.calories,
            protein: acc.protein + nut.protein,
            carbs: acc.carbs + nut.carbs,
            fat: acc.fat + nut.fat
        };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return {
        title: title,
        description: description,
        ingredients: ingredientsList,
        nutrition: totalNutrition,
        style: style,
        id: Date.now()
    };
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
