import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 6, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
});

const app = express();
const PORT = 3000;

const data = [
    { id: 1, name: 'Elemento 1' },
    { id: 2, name: 'Elemento 2' },
    { id: 3, name: 'Elemento 3' },
];

app.get('/elements', accountLimiter, (req: Request, res: Response) => {
    res.json(data);
});

app.get('/elements/:id', accountLimiter, (req: Request, res: Response) => {
    const elementId = parseInt(req.params.id, 10);
    const element = data.find((e) => e.id === elementId);

    if (element) {
        res.json(element);
    } else {
        res.status(404).json({ error: 'Elemento no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
