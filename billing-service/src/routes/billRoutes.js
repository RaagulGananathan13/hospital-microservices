const express = require('express');
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill
} = require('../controllers/billingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Bill:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         patient_id:
 *           type: integer
 *           example: 1
 *         appointment_id:
 *           type: integer
 *           example: 1
 *         amount:
 *           type: number
 *           example: 2500
 *         payment_status:
 *           type: string
 *           example: Pending
 *         billing_date:
 *           type: string
 *           example: "2026-03-30"
 */

/**
 * @swagger
 * /bills:
 *   get:
 *     summary: Get all bills
 *     tags: [Bills]
 *     responses:
 *       200:
 *         description: List of bills
 */
router.get('/', getAllBills);

/**
 * @swagger
 * /bills/{id}:
 *   get:
 *     summary: Get bill by ID
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill found
 *       404:
 *         description: Bill not found
 */
router.get('/:id', getBillById);

/**
 * @swagger
 * /bills:
 *   post:
 *     summary: Create a new bill
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       201:
 *         description: Bill created successfully
 */
router.post('/', createBill);

/**
 * @swagger
 * /bills/{id}:
 *   put:
 *     summary: Update bill by ID
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       200:
 *         description: Bill updated successfully
 *       404:
 *         description: Bill not found
 */
router.put('/:id', updateBill);

/**
 * @swagger
 * /bills/{id}:
 *   delete:
 *     summary: Delete bill by ID
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 *       404:
 *         description: Bill not found
 */
router.delete('/:id', deleteBill);

module.exports = router;