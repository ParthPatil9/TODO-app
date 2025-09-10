const zod = require('zod');

const signSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8)
});

const todoSchema = zod.object({
    title : zod.string(),
    description : zod.string()
})

module.exports = {
    signSchema,
    todoSchema
}
