var Books = require("../models/books")


module.exports.listTotal = () => {
    return Books
        .find()
        .exec()
}

module.exports.findById = id => {
    return Books
        .findOne({_id : id})
        .exec()
}

module.exports.insert = book => {
    var newBook = new Books(book)
    return newBook.save()
}

module.exports.delete = id => {
    return Books
        .deleteOne({_id: id})
        .exec()
}

module.exports.update = (book,id) => {
    return Books
        .findOneAndUpdate({_id: id}, book)
        .exec()
}

module.exports.findByCharacter = character => {
    return Books.find({ characters: character }).exec();
};

module.exports.findByTipoGenre = genre => {
    return Books
        .find({genres: genre})
        .exec()
}


module.exports.listCharacter = () => {
    return Books
        .distinct("characters")
        .exec()
}

module.exports.listGenres = () => {
    return Books
        .distinct("genres")
        .exec()
}

module.exports.findByAutor = autor => {
    return Books
        .find({_id: autor})
        .exec()
}

module.exports.findName = async function(idAuthor) {
    try {
        // Find the livro (book) containing the author with given _id
        const livro = await Books.findOne({ "author._id": idAuthor });

        if (!livro) {
            throw new Error(`Livro with author _id ${idAuthor} not found`);
        }

        // Find the author within the livro's author array and return the name
        const author = livro.author.find(a => a._id === idAuthor);
        
        if (!author) {
            throw new Error(`Author with _id ${idAuthor} not found in livro`);
        }

        return author;
    } catch (error) {
        throw new Error(`Error finding author's name: ${error.message}`);
    }
};