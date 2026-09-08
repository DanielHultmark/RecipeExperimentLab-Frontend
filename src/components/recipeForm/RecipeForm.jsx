const RecipeForm = () => {
    return (
        <div>
            <h2>Recipe Form</h2>
            <form>
                <div>
                    <label htmlFor="name">Recipe Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <button type="submit">Save Recipe</button>
            </form>
        </div>
    );
};

export default RecipeForm;
