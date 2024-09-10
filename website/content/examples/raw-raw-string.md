---
aside: false
---

# Raw String

This example shows how to send a request using a string for the GraphQL document.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

const document = /* gql */ `
  {
    countries {
      name
    }
  }	
`

const result = await graffle.rawString({
  document,
})

console.log(result.data)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  countries: [
    { name: 'Andorra' },
    { name: 'United Arab Emirates' },
    { name: 'Afghanistan' },
    { name: 'Antigua and Barbuda' },
    { name: 'Anguilla' },
    { name: 'Albania' },
    { name: 'Armenia' },
    { name: 'Angola' },
    { name: 'Antarctica' },
    { name: 'Argentina' },
    { name: 'American Samoa' },
    { name: 'Austria' },
    { name: 'Australia' },
    { name: 'Aruba' },
    { name: 'Åland' },
    { name: 'Azerbaijan' },
    { name: 'Bosnia and Herzegovina' },
    { name: 'Barbados' },
    { name: 'Bangladesh' },
    { name: 'Belgium' },
    { name: 'Burkina Faso' },
    { name: 'Bulgaria' },
    { name: 'Bahrain' },
    { name: 'Burundi' },
    { name: 'Benin' },
    { name: 'Saint Barthélemy' },
    { name: 'Bermuda' },
    { name: 'Brunei' },
    { name: 'Bolivia' },
    { name: 'Bonaire' },
    { name: 'Brazil' },
    { name: 'Bahamas' },
    { name: 'Bhutan' },
    { name: 'Bouvet Island' },
    { name: 'Botswana' },
    { name: 'Belarus' },
    { name: 'Belize' },
    { name: 'Canada' },
    { name: 'Cocos [Keeling] Islands' },
    { name: 'Democratic Republic of the Congo' },
    { name: 'Central African Republic' },
    { name: 'Republic of the Congo' },
    { name: 'Switzerland' },
    { name: 'Ivory Coast' },
    { name: 'Cook Islands' },
    { name: 'Chile' },
    { name: 'Cameroon' },
    { name: 'China' },
    { name: 'Colombia' },
    { name: 'Costa Rica' },
    { name: 'Cuba' },
    { name: 'Cape Verde' },
    { name: 'Curacao' },
    { name: 'Christmas Island' },
    { name: 'Cyprus' },
    { name: 'Czech Republic' },
    { name: 'Germany' },
    { name: 'Djibouti' },
    { name: 'Denmark' },
    { name: 'Dominica' },
    { name: 'Dominican Republic' },
    { name: 'Algeria' },
    { name: 'Ecuador' },
    { name: 'Estonia' },
    { name: 'Egypt' },
    { name: 'Western Sahara' },
    { name: 'Eritrea' },
    { name: 'Spain' },
    { name: 'Ethiopia' },
    { name: 'Finland' },
    { name: 'Fiji' },
    { name: 'Falkland Islands' },
    { name: 'Micronesia' },
    { name: 'Faroe Islands' },
    { name: 'France' },
    { name: 'Gabon' },
    { name: 'United Kingdom' },
    { name: 'Grenada' },
    { name: 'Georgia' },
    { name: 'French Guiana' },
    { name: 'Guernsey' },
    { name: 'Ghana' },
    { name: 'Gibraltar' },
    { name: 'Greenland' },
    { name: 'Gambia' },
    { name: 'Guinea' },
    { name: 'Guadeloupe' },
    { name: 'Equatorial Guinea' },
    { name: 'Greece' },
    { name: 'South Georgia and the South Sandwich Islands' },
    { name: 'Guatemala' },
    { name: 'Guam' },
    { name: 'Guinea-Bissau' },
    { name: 'Guyana' },
    { name: 'Hong Kong' },
    { name: 'Heard Island and McDonald Islands' },
    { name: 'Honduras' },
    { name: 'Croatia' },
    { name: 'Haiti' },
    { name: 'Hungary' },
    ... 150 more items
  ]
}
```
<!-- dprint-ignore-end -->
