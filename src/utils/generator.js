import { westAfricanIngredients, japaneseIngredients, cookingStyles } from '../data/ingredients';

export function generateCombo() {
    const waBase = getRandom(westAfricanIngredients);
    const jpBase = getRandom(japaneseIngredients);

    // Ensure we don't just get two "spices" or two "bases" if we can help it, 
    // but pure random is also fun. Let's try to pick 3 items: 
    // 1 West African, 1 Japanese, and 1 Random extra from either, plus a cooking style.

    const extraPool = [...westAfricanIngredients, ...japaneseIngredients].filter(
        i => i.name !== waBase.name && i.name !== jpBase.name
    );
    const extra = getRandom(extraPool);

    const style = getRandom(cookingStyles);

    return {
        title: `${waBase.name} & ${jpBase.name}`,
        description: `${style} ${waBase.name} infused with ${jpBase.name} notes, finished with ${extra.name}.`,
        ingredients: [waBase, jpBase, extra],
        style: style,
        id: Date.now()
    };
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
