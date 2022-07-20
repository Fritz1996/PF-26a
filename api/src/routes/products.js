const { Product,Category,Review ,Qa, Image} = require("../db");
const { Router } = require("express");


const router = Router();
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["title","description", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: { attributes: [] },
        },
      ],
    });
    if(name){
      let productExists = await allProducts.filter(b=> b.name.toLowerCase().includes(name.toLowerCase()));
            if (productExists.length>0) res.json(productExists);
            if(productExists.length<1) res.send([{
                name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperaments: 'Puede crearla en nuestro "Creador de Perros"', image: 'https://thumbs.dreamstime.com/b/perro-con-una-lupa-75331469.jpg'
            }]);
    }
    if(!name){
      res.status(200).send(allProducts);
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

router.get('/:id', async(req, res, next)=>{
  try{
      const {id} = req.params;
      const allProducts = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Qa,
            attributes: ["title","description", "answer", "resolved"],
            through: { attributes: [] },
          },
          {
            model: Review,
            attributes: ["rating", "title", "description"],
            through: { attributes: [] },
          },
        ],
      });
      if (id) {
          const filtered = await allProducts.filter((e) => e.id == id);
          res.json(filtered);
        }
  }
  catch(error){
      next(error);
  }
});
module.exports = router;