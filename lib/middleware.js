import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable the built-in Next.js body parser
  },
};

export function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true }); // Allow multiple files

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err); // Reject the promise if there's an error
      }
      resolve({ fields, files }); // Resolve the promise with the parsed fields and files
    });
  });
}
