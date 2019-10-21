const prod = process.env.NODE_ENV === 'production';

export const url = prod ? "http://15.164.73.29" :'http://localhost:9170'