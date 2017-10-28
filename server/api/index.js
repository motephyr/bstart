import { Router } from 'express'

import users_controller from './users_controller'
import domains_controller from './domains_controller'
import table_fields_controller from './table_fields_controller'
import table_field_xs_controller from './table_field_xs_controller'
import table_values_controller from './table_values_controller'
import year_places_controller from './year_places_controller'
import activity_docs_controller from './activity_docs_controller'

const router = Router()

// Add USERS Routes
router.use(users_controller)
router.use(domains_controller)
router.use(table_fields_controller)
router.use(table_field_xs_controller)
router.use(table_values_controller)
router.use(year_places_controller)
router.use(activity_docs_controller)

export default router
