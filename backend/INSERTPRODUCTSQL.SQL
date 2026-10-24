INSERT INTO product_snapshot (id, odoo_product_id, name, description, price, stock, category, is_active)
VALUES
(gen_random_uuid(), 1, 'Field Day Tote', 'Heavy cotton canvas, moss', 38.00, 50, 'bags', true),
(gen_random_uuid(), 2, 'The Daily Notebook', 'Recycled paper, soft cover', 18.00, 100, 'stationery', true);