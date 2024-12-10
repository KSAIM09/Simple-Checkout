// utils/stripe.js
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QUNy9JkEjaG3xiJPTz3idCqHX3AwAQKI8GDDAlN7bcVLV8n71nwCoDtB7w1SxlvfLUbeHKPDSWxsyuRIje2Cszo00OVGlpfrU'); // Replace with your actual secret key

module.exports = { stripe };
