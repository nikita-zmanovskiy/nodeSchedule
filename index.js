const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 


const app = express();
const PORT = 5000;

// Подключение CORS
app.use(cors());
app.use(express.json()); // Добавляем парсер JSON

// Подключение к MongoDB
const MONGO_URL = 'mongodb+srv://zmanovskiy01:JT0rvrm1HT9UE5E3@cluster0.gelfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Создание схемы и модели
const itemSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Item = mongoose.model('Item', itemSchema);

// Главная страница
app.get('/', (req, res) => {
    res.send('<p>work</p>');
});

// Получение всех items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Запуск сервера на всех IP
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
