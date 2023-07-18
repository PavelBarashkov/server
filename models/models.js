const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
    },
    number_phone: {
        type: DataTypes.INTEGER,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
})

const BascketProduct = sequelize.define('bascket_product', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
})
// Карточкаа тавара 
const CardProduct = sequelize.define('card-product', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    favorite: {
        type: DataTypes.STRING, 
        defaultValue: 'false',
    }
});

const ModelProduct = sequelize.define('model-product', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    cardId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
});

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    modelId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    compound: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
})

const Image = sequelize.define('image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,  
    },
    nameFile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const ModelProductImage = sequelize.define('model-product-image', {
    modelProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: ModelProduct, 
            key: 'id'
        }
    },
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image, 
            key: 'id'
        }   
    }
});

const Size = sequelize.define('size', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const ProductSize = sequelize.define('product-size', {
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product, 
            key: 'id'
        }
    },
    sizeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Size, 
            key: 'id'
        }   
    }
});
/*
=>   
Модель тавара:
id
привязка => id карточки 
цвет 
инфй2   
картинки



=> 

Тавар:
id
id модели
размер
арикул 
количество в наличии шт

*/  


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BascketProduct)
BascketProduct.belongsTo(Basket)

Product.hasMany(BascketProduct)
BascketProduct.belongsTo(Basket)

CardProduct.hasMany(ModelProduct, { foreignKey: 'cardId'})
ModelProduct.belongsTo(CardProduct, { foreignKey: 'cardId'})

// Product.belongsTo(CardProduct, { foreignKey: 'cardId' });
// CardProduct.hasMany(Product, { foreignKey: 'cardId' });

Product.hasMany(ModelProduct, {foreignKey: 'productId'})
ModelProduct.belongsTo(Product, {foreignKey: 'productId'})


ModelProduct.hasMany(Product, {foreignKey: 'modelId'})
Product.belongsTo(ModelProduct, {foreignKey: 'modelId'})


ModelProduct.belongsToMany(Image, { through: ModelProductImage });
Image.belongsToMany(ModelProduct, { through: ModelProductImage });

Product.belongsToMany(Size, { through: ProductSize });
Size.belongsToMany(ModelProduct, { through: ProductSize });

module.exports = {
    User,
    Basket,
    BascketProduct,
    CardProduct,
    ModelProduct,
    Product,
    Image,
    Size
}


