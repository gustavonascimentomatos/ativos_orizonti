import { where } from 'sequelize';
import Toughts from '../models/Toughts.js';
import User from '../models/User.js';
import Emprestimo from '../models/Emprestimo.js';
import { Op } from 'sequelize';

class EmprestimoController {

    static async createEmprestimo(req, res) {
        const usersData = await User.findAll();
        const users = usersData.map((result) => result.get({ plain: true }));

        const toughtsData = await Toughts.findAll();
        const toughts = toughtsData.map((result) => result.get({ plain: true }));
        const id =  req.params.id;

        res.render('emprestimo/create', {users, toughts, id});
    }

    static async createEmprestimoSave(req, res) {

        const id = req.body.equipamentoId
        const emprestimo = {
            dataEmprestimo: req.body.dataEmprestimo,
            userId: req.body.usuario,
            equipamentoId: req.body.equipamentoId
        }


        const tought = {
            emprestado: true
        }

        try {
            await Emprestimo.create(emprestimo);
            await Toughts.update(tought, { where: { id } });
            req.session.save(() => {
                res.redirect('/toughts/dashboard'); 
            })
        } catch (error) {
            console.log(error);
        }
    }


}


export default EmprestimoController;