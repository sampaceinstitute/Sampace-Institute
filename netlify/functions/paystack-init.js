// netlify/functions/paystack-init.js
// Handles payment initialization - secret key stays server-side

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || 'sk_test_9eabc11647dc4840a5d8d486cbd85d2bd886ccfd';

  try {
    const { email, amount, studentId, schoolId, description, applicationId } = JSON.parse(event.body);

    const reference = `SAMP-${Date.now()}-${Math.random().toString(36).substring(2,8).toUpperCase()}`;

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // convert to kobo
        reference,
        currency: 'NGN',
        callback_url: `${process.env.URL || 'https://sampaceinstitute.netlify.app'}/#payment-verify`,
        metadata: {
          custom_fields: [
            { display_name: 'Student ID',     variable_name: 'student_id',     value: studentId },
            { display_name: 'School',         variable_name: 'school_id',      value: schoolId },
            { display_name: 'Application ID', variable_name: 'application_id', value: applicationId },
            { display_name: 'Description',    variable_name: 'description',    value: description },
          ]
        }
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: false, message: err.message }),
    };
  }
};
