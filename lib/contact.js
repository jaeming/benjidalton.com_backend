import { aws } from '../config/aws'

const SITE_CONTACT = 'daylightsavings@gmail.com'
const ses = new aws.SES()

export const contact = (from, subject, text) => {
  return ses.sendEmail({
    Destination: {
      ToAddresses: [SITE_CONTACT]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <h3>
              Contact received from:  
              <span style='color: tomato;'>
                benjidalton.com.
              </span>
            </h3>
            <p>From: ${from}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${text}</p>
          `
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${subject} [benjidalton.com]`
      }
    },
    Source: SITE_CONTACT
  }).promise()
}
