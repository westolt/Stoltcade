
const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { Score, User, Game } = require('../models/index')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const scores = await Score.findAll({
        include: [
        { 
            model: User,
            attributes: ['username'],
        },
        {
            model: Game,
            attributes: ['name']
        }
    ]
    })
    res.json(scores)
})

router.get('/:id', async (req, res) => {
    const score = await Score.findByPk(req.params.id, {
        include: [
        { 
            model: User,
            attributes: ['username'],
        },
        {
            model: Game,
            attributes: ['name']
        }
        ],
    })
    if (score) {
        res.json(score)
    } else {
        res.status(404).end()
    }
})

router.post('/', tokenExtractor, async (req, res) => {
    const decoded = req.decodedToken

    if (!decoded) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user_id = decoded.id

    const { score, gameId } = req.body

    if (!score || !gameId){
        return res.status(400).json({ error: 'Missing score or gameId' })
    }

    const game_id = gameId
    const current_score = await Score.findOne({
        where: { user_id, game_id }
    })

    if (current_score) {
        if (current_score.score >= score) {
            res.json(current_score)
        } else {
            current_score.score = score
            await current_score.save()
            res.json(current_score)
        }
    } else {
        console.log("CREATE OBJECT:", { score, user_id, game_id })
        const new_score = await Score.create({
            score,
            user_id,
            game_id
        })
        res.json(new_score)
    }
})

module.exports = router