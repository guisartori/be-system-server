import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'
import RegistersController from '../controllers/RegistersController'
import OpenCashierController from '../controllers/OpenCashierController'
import CloseCashierController from '../controllers/CloseCashierController'
import CashiersController from '../controllers/CashiersController'

const cashiersRoutes = Router()
cashiersRoutes.use(ensureAuthenticated)
const registersController = new RegistersController()
const openCashierController = new OpenCashierController()
const closeCashierController = new CloseCashierController()
const cashiersController = new CashiersController()

cashiersRoutes.post(
	'/open',
	celebrate({
		[Segments.BODY]: {
			value: Joi.number().required(),
			password: Joi.string().required(),
		},
	}),
	openCashierController.create,
)

cashiersRoutes.post(
	'/register',
	celebrate({
		[Segments.BODY]: {
			value: Joi.number().required(),
			action: Joi.number().integer().required(),
		},
	}),
	registersController.create,
)

cashiersRoutes.post(
	'/close',
	celebrate({
		[Segments.BODY]: {
			password: Joi.string().required(),
		},
	}),
	closeCashierController.create,
)

cashiersRoutes.get('/situation', cashiersController.show)

cashiersRoutes.get('/', cashiersController.index)

export default cashiersRoutes
