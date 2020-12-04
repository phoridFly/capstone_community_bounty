![](RackMultipart20201204-4-1y85dty_html_f70e48a911853003.png)

# Capstone-Community-Bounty

This project was designed and implemented by Kenneth Wyckoff, Sarah Turner, and John Hash for the Oregon State University Post Baccalaureate Program in Computer Science as part of the final Capstone project.

Website: [https://community-bounty.azurewebsites.net](https://community-bounty.azurewebsites.net/)

Base URL for endpoints: [https://community-bounty.azurewebsites.net/api](https://community-bounty.azurewebsites.net/)

# Table of Contents

**[Capstone-Community-Bounty](#capstone-community-bounty)**

**[Table of Contents](#_gufth0jmilcq)**

[Core Stack Overview](#core-stack-overview)

[Deployment of Stack](#deployment-of-stack)

[Tools, External APIs, Libraries, and Auxiliary Systems](#fake)

[Azure](#azure) 

[Google Cloud](#google-cloud) 

[Auth0](#auth0) 

[Material UI and Reactstrap](#material-ui-and-reactstrap) 

[Esri](#esri) 

[Git and GitHub](#git-and-gitHub) 

**[Data Model](#data-model)**

[Collection: People](#_9tsd9tukcd5f) 

[Collection: Addresses](#_787j5s565vnz) 

[Collection: Contacts](#_vrxxlrfc32h)

[Collection: Profiles](#_z06jogug6ak) 

[Collection: Solicitations](#_2o6i7aa8230) 

[Collection: Transactions](#_v3pneua7dycr) 

[Collection: Items](#_lgs5em1tgb97) 

**[API Specification](#api-specification)**

**[People Routes](#people-routes)**

[Create Person](#_w9lh0fpiwb54) 

[Request](#_6osgkzritovv) 

[Response](#_9u5pfke291p3) 

[Add Image to Person](#_y5nnf9jfj452) 

[Request](#_m5z6gsnxrxxd) 

[Response](#_rzrnb82nt8bo) 

[View Person](#view-person) 

[Request](#_p1v0887n9lx6) 

[Response](#_8dm8eihrivhk) 

[View All People](#view-all-people) 

[Request](#_q3sjdpjtxqof) 

[Response](#_tzjh5p663wst) 

[Check If a Person Exists](#_cr4cnddah1xi) 

[Request](#_dfjv1yoms8t7) 

[Response](#_tl52yjxvv4yx) 

[Update Person](#_8hy4anyvgtjs) 

[Request](#_q1yuam29s4sy) 

[Response](#_grldj6os3i46) 

[Delete Person](#_8hzkechze8el) 

[Request](#_qyymf46nhz3z) 

[Response](#_o31su6snggdb) 

**[Transactions Routes](#transactions-routes)**

[Create a Transaction](#_jr7srqex2p0d) 

[Request](#_rc0d3ykfwpam) 

[Response](#_5e6tcel1i901) 

[View a Transaction](#_4xlgj0epn759) 

[Request](#_jq503dawvyt) 

[Response](#_lis6llcc4q2a) 

[View All Transactions](#_yelg2dh0quff) 

[Request](#_u26h40brwlb5) 

[Response](#_1r1dkux21gg5) 

[View All Transactions For a Buyer](#_n7lzvc614ywu) 

[Request](#_jjnouvuyl0nx) 

[Response](#_1b6syibk0nfm) 

[View All Transactions For a Seller](#_cbceyd80e5ud) 

[Request](#_vqnqeh8uy7m) 

[Response](#_lu1h6g57xba) 

[Update a Transaction](#_9bso4di9z4m9) 

[Request](#_y1pzvhyz39hq) 

[Response](#_giqydmsdpyst) 

[Insert a Message into a Transaction](#_pjtgsqul4oqv) 

[Request](#_uzl5dzvwwjk2) 

[Response](#_v0i821cvbxk9) 

[Delete a Message from a Transaction](#_oyq1evl5d1is) 

[Request](#_hun29a1du0oc) 

[Response](#_jw6cvdmjayqt) 

[Delete Transaction](#_ntvb2z3ijd7i) 

[Request](#_9rasnerpesvf) 

[Response](#_tpqh4916y71m) 

**[Addresses Routes](#address-routes)**

[Create an Address](#_s3z3bryp01ld) 

[Request](#_qfjsg38frcq2) 

[Response](#_4qu4yd4nw8u5) 

[View an Address](#_2gim3mp5nbg6) 

[Request](#_8unb5ketd1mk) 

[Response](#_5wlf9m9uq2of) 

[View All Addresses](#_34mkcx2x43rm) 

[Request](#_bl4wnai21yij) 

[Response](#_e2kp2uhlgobz) 

[View Address By Person Sub](#_6675525nyoo2) 

[Request](#_hxmgzngfgzff) 

[Response](#_w841to5krudx) 

[Get Addresses Within a Specified Radius](#_hxb9vb5c48c7) 

[Request](#_ixhasjqo96az) 

[Response](#_3e3nyrno95o) 

[Delete Address](#_dlker3ckzvug) 

[Request](#_yfja229520t6) 

[Response](#_ze8939dju0v4) 

[Create Default Address for a Person](#_7lf54npu1ct7) 

[Request](#_16dwsjjmw1j5) 

[Response](#_p5b8dcow22m6) 

**[Profiles Routes](#profiles-routes)**

[Create Profile](#_uq2up8ytau0x) 

[Request](#_s0ls1j2pwp2n) 

[Response](#_hwrpqzp48hno) 

[Check If Profile Exists](#_rldowijvf50b) 

[Request](#_79nqvl7iwtv) 

[Response](#_o0syccw5r1gf) 

[View a Single Profile](#_98li3xcxqeew) 

[Request](#_gpz33a3mea1u) 

[Response](#_p1uuf68dnuh3) 

[View All Profiles](#_3y37ws8jief) 

[Request](#_e3i0ubypsypo) 

[Response](#_blf7o9ekoknq) 

[Update Profile](#_dspimm8xj6xf) 

[Request](#_k8l9199uiwhh) 

[Response](#_jd85v2rzlg78) 

[Add an Item to Watchlist in Profile](#_1wua4834d6tp) 

[Request](#_k7008jqar14e) 

[Response](#_wid0nn25r2ip) 

[View a Profile&#39;s Watchlist](#_y8wy0ucfx0js) 

[Request](#_l01lilmba6ld) 

[Response](#_gbni1jv85qv9) 

[Delete a Watchlist Item](#_gsae112m2pbj) 

[Request](#_7eh5b193pwg3) 

[Response](#_v4wy4h1ulis6) 

[Delete Profile](#_bqf8qn3tcp8b) 

[Request](#_lan49em1ku35) 

[Response](#_b38ra5lw79lp) 

**[Items Routes](#items-routes)**

[Create Item](#_vn258s6nj78k) 

[Request](#_1otxeyjnexcm) 

[Response](#_9r8fbbds8vr3) 

[View Single Item](#_ew9fsl4phdo5) 

[Request](#_spguh7hjzy5x) 

[Response](#_3cghc3pay5o2) 

[View All Items](#_na6mgcnadfez) 

[Request](#_fg3slkrgkdtt) 

[Response](#_pm79yxkvn91) 

[Get All Items of a Type](#_r4pxt7kjad30) 

[Request](#_i7xix3rwwxgp) 

[Response](#_atkzn33ipyol) 

[Delete Item](#_3gbsmhrqkze0) 

[Request](#_aittxkfkk46z) 

[Response](#_a3uzvquberuw) 

**[Solicitations Routes](#solicitations-routes)**

[Create Solicitation](#_58ev2z4eybv2) 

[Request](#_45xq3s7hixzp) 

[Response](#_hry994bun9y9) 

[View a Solicitation](#_3z9ge2hgrks5) 

[Request](#_uf6ceh10t00y) 

[Response](#_wsgfr7pac0im) 

[View All Solicitations](#_t3s4mwd8bhtl) 

[Request](#_vza3dnhvrx8a) 

[Response](#_yy33ouc8v3s4) 

[View All Solicitations By a Seller](#_p33y1y6t563l) 

[Request](#_qnf26r5cm2k9) 

[Response](#_s7kvuy8k3tzy) 

[View All Solicitations Around a Set of Coordinates](#_hwwfbbhr0u5i) 

[Request](#_fb1upxnznyg1) 

[Response](#_zi587q7hu3) 

[View All Solicitations at an Address](#_xjivpeq4desl) 

[Request](#_wyim0u8rm33b) 

[Response](#_fzo54v9klc1t) 

[Update Solicitation](#_d5tf9egyo9cv) 

[Request](#_7zx0oue40b23) 

[Response](#_s4y5wlcdpdmf) 

[Add Image to Solicitation](#_djiru582e4l2) 

[Request](#_924v14ijbp5) 

[Response](#_dmp94u5z9886) 

[Delete Solicitation](#_ifn34sjakq4m) 

[Request](#_evbqp0oue7se) 

[Response](#_nniao19aqtuj) 

**[Contact Routes (Legacy Routes)](#_p30mvqee00j9)**

[Create Contact](#_b0fmn5gs6oj7) 

[View a Contact](#_v3dmigrdj1lz) 

[View All Contacts](#_icn69mz3bxkw) 

[Update Contact](#_judo3x1cc7gu) 

[Delete Contact](#_9n0wa6v3mdj1)


# Core Stack Overview

Our application uses a MERN stack with [Typescript](https://www.typescriptlang.org/) on the frontend. This is a three tier architecture for frontend, backend, and database using Javascript and JSON. The client-facing frontend is [React](https://reactjs.org/) Typescript with the addition of [Auth0 Provider](https://auth0.com/docs/libraries/auth0-react) which uses React Context to manage the authentication state globally. Next there is [Express](https://expressjs.com/) framework running on our [Node](https://nodejs.org/en/about/) server which enables all the connections for our API to render rich data in the client. The server coordinates with the [CosmoDB API for MongoDB](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction) via callbacks and promises to access or change data. Additionally, our server uses the [Mongoose library](https://mongoosejs.com/) to connect to CosmoDB and to model our document structure.

# Deployment of Stack

There is a public repository that is a copy of the code with removal of some private configuration items that are required within the CI/CD deployment architecture. The publicly available repository is available here:

[https://github.com/phoridFly/capstone\_community\_bounty](https://github.com/phoridFly/capstone_community_bounty)

Within the repository is the following structure:

1. **root** - Within the root folder is the entry file for the server, server.js, and npm package management files for the server side of the application
  1. **server -** The server folder contains subfolders of **models** and **routes** , as well as configuration for the server connection to the database. The models folder has mongoose model schemas for each collection in our database. The routes folder contains all the API routes for each respective collection. The API for our application is documented in detail in our ReadMe at the public GitHub repo mentioned above.
  2. **helpers** and **config** - These folders each contain one file and are both used in conjunction with the Google Cloud Bucket for handling imagery.
  3. **client -** In the client folder at the root, there are all the configuration files to support the client. Additional nested structure follows:
    1. **public** - This folder contains the publicly viewable html file and metadata. Icons associated with the application such as the favico and public branding are also here.
    2. **src -** All the source code is here. At the root level are the entry point (index.tsx) and core routing (app.tsx) of the application. Additional Typescript module declarations and the Webpack config are listed here. Further folders nested within are below.
      1. **header** - Files to support the core navigation navbar components are here.
      2. **models** - Typescript interfaces for API data handling are here.
      3. **pages -** There are six subfolders here that each hold the components that are tied to individual routes within the application. Some common styling is located at the root level, along with an index.ts file to export the components to make them available across the source code.
      4. **services** - Core interactions with our API are here arranged by database collection.

# Tools, External APIs, Libraries, and Auxiliary Systems

All of our application was written in Javascript with the use of Typescript to extend Javascript in the client only. We used a myriad of external APIs and libraries for our development, and the full listing of all libraries can be found in the package.json files for both the server and the client. Azure and Google Cloud were both used for API services and data hosting. Auth0 services are in use for authorization and state storage to protect unauthorized access. The client heavily uses Material UI and Reactstrap APIs for component layouts. The core map functionality was integrated via Esri&#39;s Arcgis Javascript API. As a team, we heavily used GitHub for our VCS, CI/CD pipeline, and used issue and board tools to track progress with branches. Each of these will be discussed in detail below.

1.
## Azure

As mentioned previously, Azure hosts our app as a Linux application with associated service support. We have a resource group for Community Bounty and manage the configuration of the deployed application using their tools. Additionally, the Cosmos DB account with associated APIs is hosted within this resource group. We originally pursued the use of the B2C service for user management and access with Azure, but abandoned it due to difficulty in properly configuring all the endpoints. We also abandoned blob storage on Azure for the same reason. On a final note with Azure, semi-frequent outages of the hosting platform have also occurred.

1.
## Google Cloud

Google Cloud is used to host blob storage for client imagery management, which is primarily seller posts of items for sale and profile images. The Google Bucket is accessed via the &#39;uploady&#39; library and &#39;multer&#39; helpers. Google Places API and geocoding API are both in use in the address section of our application. When a user enters an address, Google Places autocomplete API is used to fetch a list of validated addresses. Once an address is selected, the Google place\_id is sent to our server. Once there it is geocoded via the geocoding API. This allows map integration for user posts once they are created and tied to addresses.

1.
## Auth0

Auth0 and the Auth0 React SDK were used to provide both state management for authorization and identification of unique users based on the user sub created by Auth0. The React SDK uses React Context state management as a state provider at the root of our client entry point. This ensures only authenticated users can login. Auth0 handles all sign-up, login and logout processes/data in addition to jwt management.

1.
## Material UI and Reactstrap

Material UI and Reactstrap are both React Component libraries to assist with both visual and functional layouts of React Components. These components are in many ways the foundation of the application, and we built the props, function and state management around the core components provided by them for many views and pages. Reactstrap is used most heavily on the main navigation and cards/tabs on the homepage. Material-UI is used heavily elsewhere. The homepage (before logging in) is the exception as it is primarily made with css and elements with only a material UI button.

1.
## Esri

All map functionality on the homepage is provided by Esri ArcGIS Javascript API. A parent component to the map and left sidebar manages the layout. The props to support rendering the data are passed from parent to the siblings and the state between the sibling components is managed via the parent. The connection of rendering map data in the map component to props in the parent is something we would do differently if starting over. Integration of feature layers and customized widgets are more suitable for overall browser memory management instead of React state management and API fetches based on our exploration. However, integration of all the map functionality and geocoding functions with both Google Maps and MongoDB GeoJSON has been a great learning experience.

1.
## Git and GitHub

Git control and GitHub were integral to our team being able to work together to fix problems. We would often trade-off on features or problems to resolve them over time, and it would have been very difficult without git controls. Additionally, we used a Kanban-esque board and issue tracking with GitHub that we could link to pull requests. These tools helped our team to stay on track and realize when we needed to come together to re-evaluate an approach due to slip.

# Data Model

## Collection: People(#_9tsd9tukcd5f)

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | string | Arabic Numerals | Auto-generated by MongoDB / Cosmos | Yes |
| name | string | English letters, max length: | Full name of user. | Yes |
| nickname | string | English letters, Arabic numerals max length: | Name chosen by user to represent themselves on the BYF platform | Yes |
| person\_sub | string | Letters, numbers, pipe | Auto-generated by Auth0 server | Yes |
| picture | string | .jpg, .png | File name of image stored in Google Bucket. | No |
| solicitations | array | Solicitation id numbers | This will be an array of solicitation id numbers that are associated with the user. | No |
| address\_id | array | Address id numbers | Array of address id numbers associated with person. | No |
| contact\_id | string | Arabic Numerals | Currently Unused | No |
| profile\_id | string | Arabic Numerals | Currently Unused | No |
| transactions\_id | string | Arabic Numerals | This will be an array of transaction id numbers that are associated with the user | No |
| seller\_rating | number | Arabic Numerals | Rating from 0 to 5 | No |
| buyer\_rating | number | Arabic Numerals | Rating from 0 to 5 | No |

## Collection: Addresses

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | GUID | Address ID numbers | Global Unique Identifier for Addresses auto generated by MongoDB | Yes |
| person\_sub | GUID | letters, numbers, pipe | JWT sub value generated by Auth0 server | Yes |
| place\_id | GUID | alphanumeric | Generated by Google to uniquely represent a geocoded address. | Yes |
| location | object | integers | GeoJASON formatted object of type &quot;point&quot; | Yes |
| address\_name | string | string | User defined name of address | Yes |

## Collection: Contacts

Note: Contacts is a legacy collection that may be removed in a future API update.

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | string | Alphanumeric | Auto generated by MongoDB | Yes |
| email | string | Alphanumeric | User&#39;s email account | Yes |
| phone\_number | int | Integer | User&#39;s phone number | No |
| social\_id | Array | Array of valid client keys to social media | User&#39;s connections to linked social accounts | No |

## Collection: Profiles

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | GUID | Profile ID numbers | Global Unique Identifier for profile | Yes |
| person\_sub | GUID | alphanumeric and pipe | Generated by Auth0 server | Yes |
| session\_location | enum | true,false | Client provides long/lat(if true) or default\_loc\_buy is used (if false. Default is true | Yes |
| contact\_method | enum | text, email, app | Preferred contact method. Default: app will be set in post | Yes |
| search\_radius | enum | 5, 10, 15, 20, 30, 40, 50, 75 | Enumerations for radius ranges, determine search radius | Yes |
| loc\_ambiguity | enum | 1, 5, 10 | Address offset to obfuscate location of products offered. | Yes |
| watchlist | Array | Item\_id GUIDs | Array of item item\_id for foods for which the user wants alerts. | No |

## Collection: Solicitations

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | GUID | Solicitations ID numbers | Global Unique Identifier for solicitations | Yes |
| seller\_sub | GUID | alphanumeric and pipe | Sub property of JWT issued by Auth0 | Yes |
| seller\_nickname | string | alphanumeric | nickname of currently signed in user | Yes |
| product\_name | string | letters | Only names available from authoritative list | Yes |
| item\_id | GUID | Item ID numbers | GUID for product being offered | Yes |
| product\_cost | number | Integers and decimal | Seller&#39;s desired cost to buyers. | Yes |
| cost\_unit | string | Alphanumeric | User specifies units for the advertised cost. | Yes |
| description | String | Alphanumeric | Seller&#39;s description of product offered. | No |
| still\_active | boolean | true or false | Whether the solicitation is still active (true) or not (false) | Yes |
| still\_available | boolean | true or false | Whether the solicitation is still available (true) or not (false) | Yes |
| address\_id | GUID | Address ID numbers | GUID for address for seller to indicate where product is available. | Yes |
| food\_pic | string | .jpg or .png | User entered string for product image. Image name is prepended with solicitation\_id before being stored in DB and Google Bucket. | No |
| compost\_heap | boolean | true or false | Whether the solicitation is in &quot;compost heap&quot; (true) or not (false). This is permanent deactivation of solicitation. | Yes |

## Collection: Transactions

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | GUID | alphanumeric | Globally unique identifier for resource | Yes |
| buyer\_sub | GUID | alphanumeric and pipe | Sub property of JWT issued by Auth0 | Yes |
| buyer\_review\_verbose | string | alphanumeric | Feedback given by buyer about transaction | No |
| buyer\_review\_numeric | number | Arabic numerals | Rating from 0 to 5 | No |
| seller\_sub | GUID | alphanumeric and pipe | Sub property of JWT issued by Auth0 | Yes |
| seller\_review\_verbose | string | alphanumeric | Feedback given by seller about transaction | No |
| seller\_review\_numeric | number | Arabic numerals | Rating from 0 to 5 | No |
| solicitation\_id | GUID | alphanumeric | Unique identifier for associated solicitation | Yes |
| message\_log | array | object | Array of objects containing (person\_sub: val, time\_stamp: val, message: val)
person\_sub is uniquely ids person writing message
time\_stamp is auto generated
message is alphanumeric string entered by user | No |
| completed | boolean | true, false | Transaction is initially created with value of false for completed | Yes |
| seller\_nickname | string | alphanumeric | nickname of the person selling item | Yes |
| buyer\_nickname | string | alphanumeric | nickname of the person buying the item | Yes |

## Collection: Items

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | GUID | Item id | Auto generated and unique | Yes |
| product\_name | string | Single or multi-word strings | Name of the item to be given or sold | Yes |
| product\_type | enum | Enums only | Animal products, produce | Yes |

# API Specification

Routes for managing documents in the database collections are given below.

# People Routes

## Create Person

Allows for the creation of a new user on the platform

| POST/people |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| name | String | Users name | Yes |
| nickname | String | User&#39;s preferred alias on platform | Yes |
| picture | image | Users may upload an image or a default image will be assigned otherwise. | No |
| user\_sub | GUID | Generated from Auth0 server | Yes |

**Request Body Example:**

| { &quot;name&quot;: &quot;John Wayne&quot;, &quot;nickName&quot;: &quot;Duke&quot;, &quot;picture&quot;: &quot;default.jpg&quot;, &quot;user\_sub&quot;: &quot;auth0|1q2w3e4r5t6y7u8i9o0p&quot;
} |
| --- |

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created. |
| Failure | 401 | Unauthorized. |
| Failure | 409 | Conflict. |

**Response Notes:**

- Database automatically generates id field.
- Value for address\_id begins null. It must be updated later.
- Value for solicitations begins as an empty array. It may be updated later.
- Value for picture is prepended with the user\_sub

Success

| Status: 201 Created
{ &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Wayne&quot;, &quot;nickName&quot;: &quot;Duke&quot;, &quot;picture&quot;: &quot;defualt.jpg&quot;, &quot;solicitations&quot;: [], &quot;address\_id&quot;: [], &quot;transactions&quot;: [], &quot;\_id&quot;: &quot;abc123&quot;, &quot;\_v&quot;: 0
}

 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

Failure

| Status: 409 Conflict{ &quot;Error&quot;: &quot;Account with this nickname already exists.&quot;} |
| --- |

## Add Image to Person

Allows for posting a new photo that is linked to a user. Route also updates the person document.

| POST/people/images/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID string | Sub value of JWT to id person | Yes |

**Request Body:**

_Required_

Format of request body must be &quot;form-data&quot;

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| NA | file | selected file | Yes |

### Response

**Response Body:**

Success: none

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | Created. |
| Failure | 404 | Not found |

**Response Header:**

Link to the resource is returned in the response header

Note: The route prepends the user\_sub to the filename of the incoming file before storing the new filename in the database and in the cloud storage.

Example: &quot;auth0|1q2w3e4r5t6y7u8i9o0p\_my-fancy-face.jpg&quot;

## View Person

Allows for viewing a single user resource.

| GET/people/:people\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| people\_sub | GUID string | sub value of JWT for a person | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{&quot;\_id&quot;: {&quot;$oid&quot;: &quot;5f9037bf3749fd0d0cad1dc0&quot;},&quot;solicitations&quot;: [&quot;5fc57a2b448f28003566e1a4&quot;],&quot;address\_id&quot;: [&quot;5fbc23a92f8a9f0035f25679&quot;],&quot;transactions\_id&quot;: [&quot;5fc57543448f28003566e1a2&quot;],&quot;name&quot;: &quot;John Hash&quot;,&quot;nickname&quot;: &quot;The BatMan&quot;,&quot;picture&quot;: &quot;auth0|1a2s3d4f5g6h7j7j\_brian.jpg&quot;,&quot;\_\_v&quot;: 0,&quot;profile\_id&quot;: &quot;5f903c973749fd0d0cad1dc8&quot;,&quot;person\_sub&quot;: &quot;auth0|1a2s3d4f5g6h7j7j&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No resource with this id exists.&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

## View All People

Allows for viewing all people in the database.

| GET/people |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;\_id&quot;: {&quot;$oid&quot;: &quot;5f9037bf3749fd0d0cad1dc0&quot;},&quot;solicitations&quot;: [&quot;5fc57a2b448f28003566e1a4&quot;],&quot;address\_id&quot;: [&quot;5fbc23a92f8a9f0035f25679&quot;],&quot;transactions\_id&quot;: [&quot;5fc57543448f28003566e1a2&quot;],&quot;name&quot;: &quot;John Hash&quot;,&quot;nickname&quot;: &quot;The BatMan&quot;,&quot;picture&quot;: &quot;auth0|1a2s3d4f5g6h7j7j\_brian.jpg&quot;,&quot;\_\_v&quot;: 0,&quot;profile\_id&quot;: &quot;5f903c973749fd0d0cad1dc8&quot;,&quot;person\_sub&quot;: &quot;auth0|1a2s3d4f5g6h7j7j&quot;},


{&quot;\_id&quot;: {&quot;$oid&quot;: &quot;5f9037833749fd0d0cad1dbf&quot;},&quot;solicitations&quot;: [&quot;5f9490d63cd47339cccb7d27&quot;,&quot;5f973a477b69a6349c23b4c1&quot;,&quot;5fc4878eae68e70035c08c36&quot;,&quot;5fc5e268d1327215749b8d40&quot;,&quot;5fc5e3c89061c716107caac1&quot;,&quot;5fc5e4109061c716107caac2&quot;,&quot;5fc5e4849061c716107caac3&quot;],&quot;address\_id&quot;: [&quot;5fc4876cae68e70035c08c35&quot;,&quot;5fc58aaa448f28003566e1a5&quot;,&quot;5fc5df3dd1327215749b8d3f&quot;,&quot;5fc5e39b9061c716107caac0&quot;],&quot;transactions\_id&quot;: [&quot;5fc30b28cbb9f7084be1fbc8&quot;,&quot;5fc30bb456c4e908591f1f28&quot;,&quot;5fc311c86da05d08820bc64a&quot;],&quot;name&quot;: &quot;Sarah Turner&quot;,&quot;nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;buyer\_rating&quot;: 0,&quot;seller\_rating&quot;: 0,&quot;picture&quot;: &quot;auth0|9m8n7b6v5c4x3z\_IMG\_2323.jpg&quot;,&quot;person\_sub&quot;: &quot;auth0|9m8n7b6v5c4x3z&quot;,&quot;\_\_v&quot;: 0,&quot;profile\_id&quot;: &quot;5f903cc83749fd0d0cad1dc9&quot;}
] |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

## Check If a Person Exists

Allows for a specific check of whether a person exists without returning the person document.

| GET/people/check/:people\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| people\_sub | GUID string | sub value of JWT for a person | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{&quot;person found&quot;} |
| --- |

Failure

| Status: 404 Not Found{&quot;person not found&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

###


## Update Person

Updates the attributes of a user.

Note: This route is not used to add contact information, profile picture, profile information, solicitations, or transactions.

| PATCH/people/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID string | sub value of JWT to uniquely id a person | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

All the attributes here are optional depending on the situation.

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| name | string | User&#39;s name | No |
| nickname | string | Fun name for CB application. Should be unique. | No |
| seller\_rating | integer | Value of 0 – 5 | No |
| buyer\_rating | integer | Value of 0 – 5 | No |

### Response

**Response Body:**

Success: none

Failure: JSON

**Response Headers:**

Location header has self link to updated resource.

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not found{ &quot;Error&quot;: &quot;Resource not found.&quot;} |
| --- |

## Delete Person

Removes a user and associated data from the platform.

| DELETE/people/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID string | value of sub property of JWT to id a person | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Person not found.&quot;} |
| --- |

# Transactions Routes

## Create a Transaction

Allows for the creation of a new transaction on the platform.

| POST/transactions |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| buyer\_sub | string | sub value from JWT | Yes |
| buyer\_nickname | string | buyer&#39;s nickname | Yes |
| seller\_sub | string | sub value from JWT | Yes |
| seller\_nickname | string | seller&#39;s nickname | Yes |
| solicitation\_id | string | unique id string for the solicitation | Yes |
| mess | string | used in initial message to seller from buyer | Yes |

Note: the attribute completed begins as default false and is not needed in request

**Request Body Example:**

| { &quot;buyer\_sub&quot;: &quot;auth0|3v4b5n6m7n6b5&quot;, &quot;buyer\_nickname&quot;: &quot;MissesT&quot;, &quot;seller\_sub&quot;: &quot;auth0|5g5b5g5t5b5g5t5gb&quot;, &quot;solicitations\_id&quot;: &quot;1122eerr&quot;, &quot;seller\_sub&quot;: &quot;auth0|4v4v4f4v4f4r4v4fr4&quot;, &quot;seller\_nickname&quot;: &quot;Creeper&quot;, &quot;mess&quot;: &quot;I&#39;d like some of those oranges, please.&quot;} |
| --- |

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created. |
| Failure | 401 | Unauthorized. |

**Response Notes:**

- Database automatically generates id field.
- Value for completed can be updated later, but it is automatically initialized as &quot;false&quot;

Success

| Status: 201 Created
{ &quot;buyer\_review\_verbose&quot;: &quot;&quot;, &quot;buyer\_review\_numeric&quot;: &quot;&quot;, &quot;seller\_review\_verbose&quot;: &quot;&quot;, &quot;seller\_review\_numeric&quot;: &quot;&quot;, &quot;solicitations\_id&quot;: &quot;1122eerr&quot;, &quot;completed&quot;: false, &quot;buyer\_sub&quot;: &quot;auth0|3v4b5n6m7n6b5&quot;, &quot;buyer\_nickname&quot;: &quot;MissesT&quot;, &quot;seller\_sub&quot;: &quot;auth0|5g5b5g5t5b5g5t5gb&quot;, &quot;solicitations\_id&quot;: &quot;1122eerr&quot;, &quot;seller\_sub&quot;: &quot;auth0|4v4v4f4v4f4r4v4fr4&quot;, &quot;seller\_nickname&quot;: &quot;Creeper&quot;, &quot;\_v&quot;: 0, &quot;\_id&quot;: &quot;abc123&quot; &quot;message\_log&quot;: [{&quot;buyer\_sub&quot;: &quot;auth0|3v4b5n6m7n6b5&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-15:45&quot;, &quot;message&quot;: &quot;I&#39;d like some of those oranges, please.&quot;}]}

 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

**Associated Collections Notes:**

Calling this POST route to create a new transaction will add the newly created transaction id to the array of transactions in the associated people document.

## View a Transaction

Allows for viewing a single transaction resource.

| GET/transactions/:transactions\_id |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| transactions\_id | String | ID of the transaction | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{ &quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;buyer\_nickname&quot;: &quot;The Dude&quot;, &quot;buyer\_review\_verbose&quot;: &quot;Apples from Sarah&#39;s house were great, but two had worms in them.&quot;, &quot;buyer\_review\_numeric&quot;: &quot;5&quot;, &quot;seller\_sub&quot;: &quot;abc123&quot;, &quot;seller\_nickname&quot;: &quot;Apple Gal&quot;, &quot;seller\_review\_verbose&quot;: &quot;Arrived on time.&quot;, &quot;seller\_review\_numeric&quot;: &quot;5&quot;, &quot;solicitations\_id&quot;: &quot;mbcozn345&quot; &quot;id&quot;: &quot;chopknscafemg777&quot;, &quot;complete&quot;: true, &quot;message\_log&quot;: [{&quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-15:45&quot;, &quot;message&quot;: &quot;I&#39;ll be there at 4pm tomorrow&quot;},{&quot;seller\_sub&quot;: &quot;abc123&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-16:16&quot;, &quot;message&quot;: &quot;Great. See you then.&quot;},{&quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;time\_stamp&quot;: &quot;21-10-20-16:01&quot;, &quot;message&quot;: &quot;Outside picking up the apples now.&quot;}]}
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No resource with this id exists.&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

## View All Transactions

Allows for viewing all transactions in the database.

| GET/transactions |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{ &quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;buyer\_nickname&quot;: &quot;The Dude&quot;, &quot;buyer\_review\_verbose&quot;: &quot;Apples from Sarah&#39;s house were great, but two had worms in them.&quot;, &quot;buyer\_review\_numeric&quot;: &quot;5&quot;, &quot;seller\_sub&quot;: &quot;abc123&quot;, &quot;seller\_nickname&quot;: &quot;Apple Gal&quot;, &quot;seller\_review\_verbose&quot;: &quot;Arrived on time.&quot;, &quot;seller\_review\_numeric&quot;: &quot;5&quot;, &quot;solicitations\_id&quot;: &quot;mbcozn345&quot; &quot;id&quot;: &quot;chopknscafemg777&quot;, &quot;complete&quot;: true, &quot;message\_log&quot;: [{&quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-15:45&quot;, &quot;message&quot;: &quot;I&#39;ll be there at 4pm tomorrow&quot;},{&quot;seller\_sub&quot;: &quot;abc123&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-16:16&quot;, &quot;message&quot;: &quot;Great. See you then.&quot;},{&quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;time\_stamp&quot;: &quot;21-10-20-16:01&quot;, &quot;message&quot;: &quot;Outside picking up the apples now.&quot;}]},
{ &quot;buyer\_review\_verbose&quot;: &quot;&quot;, &quot;buyer\_review\_numeric&quot;: &quot;&quot;, &quot;seller\_review\_verbose&quot;: &quot;&quot;, &quot;seller\_review\_numeric&quot;: &quot;&quot;, &quot;solicitations\_id&quot;: &quot;1122eerr&quot;, &quot;completed&quot;: false, &quot;buyer\_sub&quot;: &quot;auth0|3v4b5n6m7n6b5&quot;, &quot;buyer\_nickname&quot;: &quot;MissesT&quot;, &quot;seller\_sub&quot;: &quot;auth0|5g5b5g5t5b5g5t5gb&quot;, &quot;solicitations\_id&quot;: &quot;1122eerr&quot;, &quot;seller\_sub&quot;: &quot;auth0|4v4v4f4v4f4r4v4fr4&quot;, &quot;seller\_nickname&quot;: &quot;Creeper&quot;, &quot;\_v&quot;: 0, &quot;\_id&quot;: &quot;abc123&quot; &quot;message\_log&quot;: [{&quot;buyer\_sub&quot;: &quot;auth0|3v4b5n6m7n6b5&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-15:45&quot;, &quot;message&quot;: &quot;I&#39;d like some of those oranges, please.&quot;}]}
] |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No resource with this id exists.&quot;} |
| --- |

## View All Transactions For a Buyer

Allows for viewing all transactions by a specific buyer.

| GET/transactions/buyer/:buyer\_sub |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| buyer\_sub | String | sub value for the buyer | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK{&quot;food\_pic&quot;: &quot;5fc5e268d1327215749b8d40\_currants-3538617\_1920.jpg&quot;,&quot;description&quot;: &quot;delicious red currants available fresh&quot;,&quot;cost\_unit&quot;: &quot;pound &quot;,&quot;product\_cost&quot;: 1,&quot;product\_name&quot;: &quot;Red Currants&quot;,&quot;\_id&quot;: &quot;5fc5eac19061c716107caacb&quot;,&quot;completed&quot;: false,&quot;seller\_sub&quot;: &quot;auth0|noneyourbusiness2&quot;,&quot;buyer\_sub&quot;: &quot;auth0|noneyourbusiness&quot;,&quot;buyer\_nickname&quot;: &quot;Farmer\_Frank&quot;,&quot;solicitation\_id&quot;: &quot;5fc5e268d1327215749b8d40&quot;,&quot;message\_log&quot;: [{&quot;\_id&quot;: &quot;5fc5eac19061c716107caacc&quot;,&quot;buyer\_sub&quot;: &quot;auth0|noneyourbusiness&quot;,&quot;message&quot;: &quot;I love currants!&quot;,&quot;time\_stamp&quot;: &quot;2020-12-01T07:03:29.787Z&quot;}]}

 |
| --- |

Failure

| Status: 404 Not Found[{&quot;error&quot;: &quot;You have no buyer transactions.&quot;,&quot;completed&quot;: true}]
 |
| --- |

Note that completed will return as true here for internal purposes.

## View All Transactions For a Seller

Allows for viewing all transactions by a specific buyer.

| GET/transactions/seller/:seller\_sub |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| seller\_sub | String | sub value on the JWT for the seller | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK{&quot;food\_pic&quot;: &quot;5fc5e268d1327215749b8d40\_currants-3538617\_1920.jpg&quot;,&quot;description&quot;: &quot;delicious red currants available fresh&quot;,&quot;cost\_unit&quot;: &quot;pound &quot;,&quot;product\_cost&quot;: 1,&quot;product\_name&quot;: &quot;Red Currants&quot;,&quot;\_id&quot;: &quot;5fc5eac19061c716107caacb&quot;,&quot;completed&quot;: false,&quot;seller\_sub&quot;: &quot;auth0|noneyourbusiness2&quot;,&quot;buyer\_sub&quot;: &quot;auth0|noneyourbusiness&quot;,&quot;buyer\_nickname&quot;: &quot;Farmer\_Frank&quot;,&quot;solicitation\_id&quot;: &quot;5fc5e268d1327215749b8d40&quot;,&quot;message\_log&quot;: [{&quot;\_id&quot;: &quot;5fc5eac19061c716107caacc&quot;,&quot;buyer\_sub&quot;: &quot;auth0|noneyourbusiness&quot;,&quot;message&quot;: &quot;I love currants!&quot;,&quot;time\_stamp&quot;: &quot;2020-12-01T07:03:29.787Z&quot;}]}

 |
| --- |

Failure

| Status: 404 Not Found[{&quot;error&quot;: &quot;You have no seller transactions.&quot;,&quot;completed&quot;: true}]
 |
| --- |

Note that completed will return as true here for internal purposes.

##


##


## Update a Transaction

Allows for updating properties of the transaction exclusive of the message log.

| PATCH/transactions/:transactions\_id |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| transactions\_id | String | ID of the transaction | Yes |

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

All the attributes here are optional depending on the situation and whether the buyer or seller is leaving reviews.

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| completed | boolean | true or false. Initialized as false, updated to true when transaction is completed | No |
| buyer\_review\_verbose | string | Buyer&#39;s review of the seller | No |
| seller\_review\_verbose | string | Seller&#39;s review of the buyer | No |
| seller\_review\_numeric | integer | Value of 0 – 5 | No |
| buyer\_review\_numeric | integer | Value of 0 – 5 | No |

### Response

**Response Body:**

Success: none

Failure: JSON

**Response Headers:**

Location header has self link to updated resource

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 204 No Content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No transaction with this id exists.&quot;} |
| --- |

## Insert a Message into a Transaction

Allows for adding a message to the the message log sub document in a transactions document

| PUT/transaction/:transactions\_id/messages |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| transactions\_id | String | ID of the transaction | Yes |

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

All the attributes here are required. The time stamp field in a message is generated by the server.

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| message | string | Text that person wishes to add to their message | Yes |
| peson\_sub | string | sub value in JWT for identifying a person | Yes |

### Response

**Response Body:**

Success: JSON

Failure: JSON

**Response Headers:**

None altered

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 201 Created{ &quot;buyer\_id&quot;: &quot;xyz987&quot;, &quot;buyer\_review\_verbose&quot;: &quot;&quot;, &quot;buyer\_review\_numeric&quot;: &quot;&quot;, &quot;seller\_id&quot;: &quot;abc123&quot;, &quot;seller\_review\_verbose&quot;: &quot;&quot;, &quot;seller\_review\_numeric&quot;: &quot;&quot;, &quot;solicitations\_id&quot;: &quot;mbcozn345&quot; &quot;id&quot;: &quot;chopknscafemg777&quot;, &quot;complete&quot;: true, &quot;message\_log&quot;: [{&quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-15:45&quot;, &quot;message&quot;: &quot;I&#39;ll be there at 4pm tomorrow&quot;},{&quot;seller\_sub&quot;: &quot;abc123&quot;, &quot;time\_stamp&quot;: &quot;20-10-20-16:16&quot;, &quot;message&quot;: &quot;Great. See you then.&quot;},{&quot;buyer\_sub&quot;: &quot;xyz987&quot;, &quot;time\_stamp&quot;: &quot;21-10-20-16:01&quot;, &quot;message&quot;: &quot;Outside picking up the apples now.&quot;}]} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Transaction not found.&quot;} |
| --- |

## Delete a Message from a Transaction

Removes a message from a transaction document.

| DELETE/transaction/:transactions\_id/messages/:messages\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| transactions\_id | GUID | Identifies a transaction uniquely | Yes |
| messages\_id | GUID | Identifies a message uniquely | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Resource not found.&quot;} |
| --- |

## Delete Transaction

Removes a transaction and associated data from the platform.

| DELETE/transaction/:transaction\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| transactions\_id | GUID | Identifies a transaction uniquely | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Transaction not found.&quot;} |
| --- |

# Addresses Routes

## Create an Address

Allows for the creation of a new address on the platform

| POST/address |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

| Property | Type | Description | Required? |
| --- | --- | --- | --- |
| place\_id | GUID | Generated by Google Geocoder | Yes |
| person\_sub | GUID | sub value of JWT | Yes |
| address\_name | string | User defined name of address | Yes |

**Request Body Example**

| { &quot;person\_sub&quot;: &quot;big345&quot; &quot;place\_id&quot;: &quot;4h5h6j77j8jfff&quot;, &quot;address\_name&quot;: &quot;Home&quot;} |
| --- |

Note: Formatted address\_string and location coordinates are produced by Google Geocoding service.

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created. |
| Failure | 401 | Unauthorized. |
| Failure | 409 | Conflict. |

**Response Notes:**

- Database automatically generates id field.
- Formatted address\_string and location coordinates are produced by Google Geocoding API. It requires the client to validate and get geocode before the post request.

Success

| Status: 201 Created
{ &quot;\_id&quot;: &quot;bibbidyboo&quot;, &quot;person\_sub&quot;: &quot;big345&quot; &quot;place\_id&quot;: &quot;4h5h6j77j8jfff&quot;, &quot;address\_string&quot;: &quot;111 Orange Street, South Park, CO, USA&quot; &quot;address\_name&quot;: &quot;Home&quot;&quot;location&quot;: {&quot;type&quot;: &quot;Point&quot;,&quot;coordinates&quot;: [-76.51260839999999,43.449584]}
}
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 409 Conflict{ &quot;Error&quot;: &quot;User address name already defined&quot;} |
| --- |

## View an Address

Allows for viewing a single address in the database by id.

| GET/address/:address\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| address\_id | GUID | Address identifier | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{ &quot;\_id&quot;: &quot;bibbidyboo&quot;, &quot;person\_sub&quot;: &quot;big345&quot; &quot;place\_id&quot;: &quot;4h5h6j77j8jfff&quot;, &quot;address\_string&quot;: &quot;111 Orange Street, South Park, CO, USA&quot; &quot;address\_name&quot;: &quot;Home&quot;, &quot;default\_address&quot;: &quot;true&quot;,&quot;location&quot;: {&quot;type&quot;: &quot;Point&quot;,&quot;coordinates&quot;: [-76.51260839999999,43.449584]}
}
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

## View All Addresses

Access a list of all addresses in the database.

| GET/address |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;location&quot;: {&quot;type&quot;: &quot;Point&quot;,&quot;coordinates&quot;: [-117.2515136,34.0571106]},&quot;default\_address&quot;: true,&quot;\_id&quot;: &quot;5fb46dfb1e80620035b98111&quot;,&quot;person\_sub&quot;: &quot;auth0|5fa2f0bbb472680076ec9f50&quot;,&quot;place\_id&quot;: &quot;ChIJWfpelZur3IARzX5O\_p38Dlk&quot;,&quot;address\_string&quot;: &quot;25339 Lane St, Loma Linda, CA 92354, USA&quot;,&quot;address\_name&quot;: &quot;Loma Linda Dwight&#39;s Beet Farm&quot;,&quot;\_\_v&quot;: 0},{&quot;location&quot;: {&quot;type&quot;: &quot;Point&quot;,&quot;coordinates&quot;: [-117.2398929,34.0533236]},&quot;default\_address&quot;: false,&quot;\_id&quot;: &quot;5fb46e1e1e80620035b98112&quot;,&quot;person\_sub&quot;: &quot;auth0|5fa2f0bbb472680076ec9f50&quot;,&quot;place\_id&quot;: &quot;ChIJx4GgX7yr3IARxgai4yrSldw&quot;,&quot;address\_string&quot;: &quot;11035 Ragsdale Rd, Loma Linda, CA 92354, USA&quot;,&quot;address\_name&quot;: &quot;Loma Linda Pomegranate Ranch&quot;,&quot;\_\_v&quot;: 0}]

 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

## View Address By Person Sub

Allows for viewing the addresses associated with a person in the database.

| GET/address/person/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID | Sub derived from JWT that uniquely identifies a person | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{ &quot;\_id&quot;: &quot;bibbidyboo&quot;, &quot;person\_sub&quot;: &quot;big345&quot; &quot;place\_id&quot;: &quot;4h5h6j77j8jfff&quot;, &quot;address\_string&quot;: &quot;111 Orange Street, South Park, CO, USA&quot; &quot;address\_name&quot;: &quot;Home&quot;, &quot;default\_address&quot;: &quot;true&quot;,&quot;location&quot;: {&quot;type&quot;: &quot;Point&quot;,&quot;coordinates&quot;: [-76.51260839999999,43.449584]}
}
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

## Get Addresses Within a Specified Radius

Returns addresses within the specified radius of the specified coordinates.

| PUT/address/radius |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| coordinates | array | Decimal longitude and latitude | Yes |
| radius | integer | Radius in number of miles | Yes |

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{&quot;location&quot;: {&quot;type&quot;: &quot;Point&quot;,&quot;coordinates&quot;: [-117.2398929,34.0533236]},&quot;default\_address&quot;: false,&quot;\_id&quot;: &quot;5fb46e1e1e80620035b98112&quot;,&quot;person\_sub&quot;: &quot;auth0|5fa2f0bbb472680076ec9f50&quot;,&quot;place\_id&quot;: &quot;ChIJx4GgX7yr3IARxgai4yrSldw&quot;,&quot;address\_string&quot;: &quot;11035 Ragsdale Rd, Loma Linda, CA 92354, USA&quot;,&quot;address\_name&quot;: &quot;Loma Linda Pomegranate Ranch&quot;,&quot;\_\_v&quot;: 0}
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Addresses Not Found&quot;} |
| --- |

## Delete Address

Remove an address from the database.

| DELETE/address/:address\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| address\_id | GUID | Identifies an address uniquely | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Transaction not found.&quot;} |
| --- |

## Create Default Address for a Person

Allows for changing the default address for a person.

| PATCH/address/default/:person\_sub/:address\_name |
| --- |

Note: On creation of an address for a user, the first address is the default address. This route allows any user address to be designated the default.

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID string | sub value of JWT | Yes |
| address\_name | string | The user given name for their address | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: none

Failure: JSON

**Response Headers:**

Location header has self link to updated resource

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 204 No Content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No person with this id exists.&quot;} |
| --- |

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No address with this name exists.&quot;} |
| --- |

# Profiles Routes

## Create Profile

Allows for the creation of user profile on the platform

| POST/profile |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Notes:**

- A post only requires a person\_sub. Other attributes will be set to a default value or left blank and updated as needed.

**Request Attributes**

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| person\_sub | GUID | Person ID number | GUID for person, these are their profile | Yes |

**Request Body Example**

| { &quot;person\_sub&quot;: &quot;auth0|big345&quot;} |
| --- |

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created. |
| Failure | 401 | Unauthorized. |
| Failure | 409 | Conflict. |

**Response Notes:**

- Database automatically generates id field.

Success

| Status: 201 Created{ &quot;\_id&quot;: &quot;4g5h6j7&quot;, &quot;person\_sub&quot;: &quot;auth0|big345&quot;, &quot;session\_location&quot;: &quot;true&quot;, &quot;contact\_method&quot;: &quot;app&quot;, &quot;default\_loc\_buy&quot;: :[] &quot;search\_radius&quot;: &quot;30&quot;, &quot;loc\_ambiguity&quot;: &quot;5&quot; &quot;Watchlist&quot;:[] }
 |
| --- |
|
 |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 409 Conflict{ &quot;Error&quot;: &quot;User profile already defined&quot;} |
| --- |

## Check If Profile Exists

Returns a message that profile exists if found.

| GET/profile/:profile\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| profile\_sub | GUID | Person identifier based on sub of JWT | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{ &quot;found&quot; }
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Profile not found&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;No authorization token found&quot;} |
| --- |

## View a Single Profile

Returns a message that profile exists if found.

| GET/profile/person/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID | Person identifier based on sub of JWT | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{ &quot;\_id&quot;: &quot;4g5h6j7&quot;, &quot;person\_sub&quot;: &quot;auth0|big345&quot;, &quot;session\_location&quot;: &quot;true&quot;, &quot;contact\_method&quot;: &quot;app&quot;, &quot;default\_loc\_buy&quot;: :[] &quot;search\_radius&quot;: &quot;30&quot;, &quot;loc\_ambiguity&quot;: &quot;5&quot; &quot;Watchlist&quot;:[] }
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Profile not found&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;No authorization token found&quot;} |
| --- |

## View All Profiles

Get all profiles in database

| GET/profile |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;contact\_method&quot;: &quot;app&quot;,&quot;search\_radius&quot;: &quot;30&quot;,&quot;loc\_ambiguity&quot;: &quot;5&quot;,&quot;session\_location&quot;: &quot;true&quot;,&quot;watchlist&quot;: [&quot;5f98bbfb9e4d782509a824ff&quot;,&quot;5f98bbe69e4d782509a82478&quot;,&quot;5f98bbfa9e4d782509a824f8&quot;],&quot;\_id&quot;: &quot;5f903c973749fd0d0cad1dc8&quot;,&quot;default\_loc\_buy&quot;: [],&quot;person\_sub&quot;: &quot;auth0|nope&quot;,&quot;\_\_v&quot;: 0},{&quot;contact\_method&quot;: &quot;app&quot;,&quot;search\_radius&quot;: &quot;30&quot;,&quot;loc\_ambiguity&quot;: &quot;5&quot;,&quot;session\_location&quot;: &quot;true&quot;,&quot;watchlist&quot;: [&quot;5f98bbe99e4d782509a8248c&quot;,&quot;5f98bbe99e4d782509a8248c&quot;,&quot;5f98bbdf9e4d782509a82459&quot;,&quot;5f98bbe19e4d782509a8245b&quot;,&quot;5f98bbfc9e4d782509a82506&quot;,&quot;5f98bc069e4d782509a82543&quot;],&quot;\_id&quot;: &quot;5f903cc83749fd0d0cad1dc9&quot;,&quot;person\_sub&quot;: &quot;auth0|backup&quot;,&quot;\_\_v&quot;: 0},{&quot;contact\_method&quot;: &quot;app&quot;,&quot;search\_radius&quot;: &quot;30&quot;,&quot;loc\_ambiguity&quot;: &quot;5&quot;,&quot;session\_location&quot;: &quot;true&quot;,&quot;watchlist&quot;: [],&quot;\_id&quot;: &quot;5fb55cfc18e24f0f04cd5526&quot;,&quot;person\_sub&quot;: &quot;auth0|lookaway&quot;,&quot;\_\_v&quot;: 0},]
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Profile not found&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;No authorization token found&quot;} |
| --- |

## Update Profile

Legacy Route

Updates profile attributes other than the watchlist, which has a different PUT route.

| PATCH/profile/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID | Person identifier in JWT | Yes |

**Request Body:**

_Required_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

Legacy Route: Attribute update may be reimplemented later and some have been offloaded to in application options.

Success

| Status: 204 OK{&quot;n&quot;: 1,&quot;nModified&quot;: 1,&quot;ok&quot;: 1} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

## Add an Item to Watchlist in Profile

Allows added an item to a user&#39;s watchlist

| PUT/profile/:person\_sub/:product\_name |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID | Person identifier in JWT | Yes |
| product\_name | string | string name of product wished to be added | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 |
 |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 204 [&quot;\_id&quot;: &quot;5f98bbe69e4d782509a82478&quot;,&quot;product\_name&quot;: &quot;Blood Orange&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0] |
| --- |

Failure

| Status: 404 Not Found{ &quot;Profile not found&quot;} |
| --- |

## View a Profile&#39;s Watchlist

Returns a watchlist array of item ids.

| GET/profile/watchlist/:person\_sub |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID | Person identifier based on sub of JWT | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK

[{&quot;\_id&quot;: &quot;5f98bbe69e4d782509a82478&quot;,&quot;product\_name&quot;: &quot;Blood Orange&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0},{&quot;\_id&quot;: &quot;5f98bbfa9e4d782509a824f8&quot;,&quot;product\_name&quot;: &quot;Kiwifruit&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0},{&quot;\_id&quot;: &quot;5f98bbfb9e4d782509a824ff&quot;,&quot;product\_name&quot;: &quot;Lemon&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0}]


 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Items not found&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;No authorization token found&quot;} |
| --- |

## Delete a Watchlist Item

Remove an item from a user&#39;s watchlist.

| DELETE/profile/watchlist/:person\_sub/:item\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| person\_sub | GUID | Person identifier in JWT | Yes |
| item\_id | GUID | id of item to remove |
 |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Transaction not found.&quot;} |
| --- |

## Delete Profile

Remove a profile from database

| DELETE/profile/:profile\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| profile\_id | GUID | unique id for profile document | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Profile not found.&quot;} |
| --- |

# Items Routes

## Create Item

This is not a method exposed as a route in Express publicly. Items will be directly loaded into MongoDB interface or be a non-accessible route for clients.

| POST/items/notPublic |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

| Property | Type | Valid Values | Description | Required? |
| --- | --- | --- | --- | --- |
| \_id | GUID | Item id | Auto generated and unique | Y |
| product\_name | string | Single or multi-word strings | Name of the item to be given or sold | Y |
| product\_type | enum | Enums only | animal products, produce | Y |

**Request Body Example**

| { &quot;product\_name&quot;: &quot;onion&quot;, &quot;product\_type&quot;: &quot;produce&quot; } |
| --- |

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created. |
| Failure | 401 | Unauthorized. |
| Failure | 409 | Conflict. |

**Response Notes:**

- Database automatically generates id field.
- The self attribute is not stored in the database and represents a live link to the newly created REST resource.

Success

| Status: 201 Created{ &quot;product\_name&quot;: &quot;onion&quot;, &quot;product\_type&quot;: &quot;produce&quot; }
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

## View Single Item

Get a single item from the database by id

| GET/items/:item\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| item\_id | GUID | Item identifier | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{ &quot;\_id&quot;: &quot;pp7&quot;, &quot;product\_name&quot;: &quot;onion&quot;, &quot;product\_type&quot;: &quot;produce&quot; }
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

##


## View All Items

Returns array off all items in database

| GET/items |
| --- |

Note that pagination is not yet implemented and list can be cumbersome

### Request

**Request Parameters:**

_None_

**Request Body:**

_None_

**Authorization:**

_No_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK[{&quot;\_id&quot;: &quot;5f97a5f9192b772360610035&quot;,&quot;product\_name&quot;: &quot;Dragonfruit&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0},{&quot;\_id&quot;: &quot;5f98bbdf9e4d782509a82459&quot;,&quot;product\_name&quot;: &quot;Acorn Squash&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0},{&quot;\_id&quot;: &quot;5f98bbe19e4d782509a8245a&quot;,&quot;product\_name&quot;: &quot;Almonds&quot;,&quot;product\_type&quot;: &quot;produce&quot;,&quot;\_\_v&quot;: 0}]
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

##


## Get All Items of a Type

Returns array of products of type specified

| GET/items/type/:product\_type |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| product\_type | enum | &#39;produce&#39; or &#39;animal product&#39; or only options | Yes |

**Request Notes:**

- Only these two enums are supported

**Request Body:**

_None_

**Authorization:**

_No_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK[{&quot;\_id&quot;: &quot;5f98bc109e4d782509a82580&quot;,&quot;product\_name&quot;: &quot;Eggs&quot;,&quot;product\_type&quot;: &quot;animal product&quot;,&quot;\_\_v&quot;: 0},{&quot;\_id&quot;: &quot;5f98bc109e4d782509a82581&quot;,&quot;product\_name&quot;: &quot;Honey&quot;,&quot;product\_type&quot;: &quot;animal product&quot;,&quot;\_\_v&quot;: 0}]
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Not Found&quot;} |
| --- |

##


## Delete Item

This is not a method exposed as a public route. Items will be deleted directly from MongoDB interface or be a non-accessible route for clients.

Remove a profile from database

| DELETE/item/notPublic/:item\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| item\_id | GUID | unique id for item document | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Item not found.&quot;} |
| --- |

#


# Solicitations Routes

## Create Solicitation

Allows for the creation of a new Solicitation

| POST/solicitations |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| product\_name | String | Name of the product being offered | Yes |
| product\_cost | String | Cost for purchase | Yes |
| cost\_unit | String | Units product is sold in | Yes |
| description | String | Description of product available | Yes |
| still\_active | Boolean | Indicator of whether the product is still being offered | Yes |
| still\_available | Boolean | Indicator of whether product is immediately available | Yes |
| address\_id | GUID | Address where product is being offered | Yes |
| compost\_heap | Boolean | Indicates whether it is permanently removed | Yes |
| seller\_sub | GUID | Sub property of jwt | Yes |

Note that product image food\_pic is not added in this route.

**Request Body Example**

| { &quot;product\_name&quot;: &quot;carrot&quot;, &quot;product\_cost&quot;: &quot;1&quot;, &quot;cost\_unit&quot;: &quot;bushel&quot;, &quot;description&quot;: &quot;standard orange root fruit&quot;, &quot;still\_active&quot; &quot;true&quot;, &quot;still\_available&quot;: &quot;true&quot;, &quot;compost\_heap&quot;: &quot;false&quot;, &quot;seller\_sub&quot;: &quot;123456abcdef&quot;, &quot;product\_id&quot;: &quot;fed456abc123&quot;, &quot;address\_id&quot;: &quot;edc624afb351&quot;} |
| --- |

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 201 | Created. |
| Failure | 401 | Unauthorized. |
| Failure | 409 | Conflict. |

**Response Notes:**

- Database automatically generates id field.
- The self attribute is not stored in the database and represents a live link to the newly created REST resource.

Success

| Status: 201 Created
{ &quot;product\_name&quot;: &quot;carrot&quot;, &quot;product\_cost&quot;: &quot;1&quot;, &quot;cost\_unit&quot;: &quot;bushel&quot;, &quot;description&quot;: &quot;standard orange root fruit&quot;, &quot;still\_active&quot; &quot;true&quot;, &quot;still\_available&quot;: &quot;true&quot;, &quot;compost\_heap&quot;: &quot;false&quot;, &quot;seller\_sub&quot;: &quot;123456abcdef&quot;, &quot;product\_id&quot;: &quot;fed456abc123&quot;, &quot;address\_id&quot;: &quot;edc624afb351&quot;}
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 409 Conflict{ &quot;Error&quot;: &quot;Solicitation already exists.&quot;} |
| --- |

## View a Solicitation

Allows for viewing a single solicitation resource.

| GET/solicitations/:solicitations\_id |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| solicitations\_id | String | ID of the solicitation | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
{&quot;\_id&quot;: &quot;5fc9387ac5f0c900350e10ec&quot;,&quot;product\_name&quot;: &quot;Kale&quot;,&quot;product\_cost&quot;: 2.25,&quot;cost\_unit&quot;: &quot;bunch&quot;,&quot;description&quot;: &quot;Fresh and packed with vitamins.&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_sub&quot;: &quot;auth0|dontlook1111&quot;,&quot;address\_id&quot;: &quot;5fc9383fc5f0c900350e10eb&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc9387ac5f0c900350e10ec\_kale.jpg&quot;}
 |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No resource with this id exists.&quot;} |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

## View All Solicitations

Allows for viewing all solicitations in the database.

| GET/solicitations |
| --- |

### Request

**Request Parameters:**

_None_

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;\_id&quot;: &quot;5fc5e268d1327215749b8d40&quot;,&quot;product\_name&quot;: &quot;Red Currants&quot;,&quot;product\_cost&quot;: 1,&quot;cost\_unit&quot;: &quot;pound &quot;,&quot;description&quot;: &quot;delicious red currants available fresh&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|no4no4no4no&quot;,&quot;address\_id&quot;: &quot;5fc5df3dd1327215749b8d3f&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e268d1327215749b8d40\_currants-3538617\_1920.jpg&quot;},{&quot;\_id&quot;: &quot;5fc5e3c89061c716107caac1&quot;,&quot;product\_name&quot;: &quot;Butternut Squash&quot;,&quot;product\_cost&quot;: 0,&quot;cost\_unit&quot;: &quot;&quot;,&quot;description&quot;: &quot;Free butternut squash grown in our garden&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|cantseeme123&quot;,&quot;address\_id&quot;: &quot;5fc5e39b9061c716107caac0&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e3c89061c716107caac1\_pumpkin-2802114\_1920.jpg&quot;}]
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No resource with this id exists.&quot;} |
| --- |

## View All Solicitations By a Seller

Allows for viewing all solicitations in the database looking them up by seller\_sub

| GET/solicitations/:seller\_sub |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| seller\_sub | GUID | Sub property of JSON web token | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;\_id&quot;: &quot;5fc5e268d1327215749b8d40&quot;,&quot;product\_name&quot;: &quot;Red Currants&quot;,&quot;product\_cost&quot;: 1,&quot;cost\_unit&quot;: &quot;pound &quot;,&quot;description&quot;: &quot;delicious red currants available fresh&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|no4no4no4no&quot;,&quot;address\_id&quot;: &quot;5fc5df3dd1327215749b8d3f&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e268d1327215749b8d40\_currants-3538617\_1920.jpg&quot;},{&quot;\_id&quot;: &quot;5fc5e3c89061c716107caac1&quot;,&quot;product\_name&quot;: &quot;Butternut Squash&quot;,&quot;product\_cost&quot;: 0,&quot;cost\_unit&quot;: &quot;&quot;,&quot;description&quot;: &quot;Free butternut squash grown in our garden&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|cantseeme123&quot;,&quot;address\_id&quot;: &quot;5fc5e39b9061c716107caac0&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e3c89061c716107caac1\_pumpkin-2802114\_1920.jpg&quot;}]
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No solicitations found.&quot;} |
| --- |

## View All Solicitations Around a Set of Coordinates

Allows for viewing all solicitations in the database within a given radius of a set of coordinates.

| GET/solicitations/radius/:centerLong/:centerLat/:rad |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| centerLong | number | longitude of point | Yes |
| centerLat | number | latitude of point | Yes |
| rad | integer | radius in number of miles | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;\_id&quot;: &quot;5fc5e268d1327215749b8d40&quot;,&quot;product\_name&quot;: &quot;Red Currants&quot;,&quot;product\_cost&quot;: 1,&quot;cost\_unit&quot;: &quot;pound &quot;,&quot;description&quot;: &quot;delicious red currants available fresh&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|no4no4no4no&quot;,&quot;cooridates&quot;: &quot;[-122, 44]&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e268d1327215749b8d40\_currants-3538617\_1920.jpg&quot;},{&quot;\_id&quot;: &quot;5fc5e3c89061c716107caac1&quot;,&quot;product\_name&quot;: &quot;Butternut Squash&quot;,&quot;product\_cost&quot;: 0,&quot;cost\_unit&quot;: &quot;&quot;,&quot;description&quot;: &quot;Free butternut squash grown in our garden&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|cantseeme123&quot;,&quot;coordinates&quot;: &quot;[-122, 44]&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e3c89061c716107caac1\_pumpkin-2802114\_1920.jpg&quot;}]
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;No resource with this id exists.&quot;} |
| --- |

## View All Solicitations at an Address

Allows for viewing all solicitations in the database associated with an address id.

| GET/solicitations/address/:address\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| address\_id | GUID | id of address auto generated by MongoDB | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: &quot;application/json&quot;

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 200 | OK. |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 200 OK
[{&quot;\_id&quot;: &quot;5fc5e268d1327215749b8d40&quot;,&quot;product\_name&quot;: &quot;Red Currants&quot;,&quot;product\_cost&quot;: 1,&quot;cost\_unit&quot;: &quot;pound &quot;,&quot;description&quot;: &quot;delicious red currants available fresh&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|no4no4no4no&quot;,&quot;cooridates&quot;: &quot;[-122, 44]&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e268d1327215749b8d40\_currants-3538617\_1920.jpg&quot;},{&quot;\_id&quot;: &quot;5fc5e3c89061c716107caac1&quot;,&quot;product\_name&quot;: &quot;Butternut Squash&quot;,&quot;product\_cost&quot;: 0,&quot;cost\_unit&quot;: &quot;&quot;,&quot;description&quot;: &quot;Free butternut squash grown in our garden&quot;,&quot;still\_active&quot;: true,&quot;still\_available&quot;: true,&quot;compost\_heap&quot;: false,&quot;seller\_nickname&quot;: &quot;Professor\_Pomegranate&quot;,&quot;seller\_sub&quot;: &quot;auth0|cantseeme123&quot;,&quot;coordinates&quot;: &quot;[-122, 44]&quot;,&quot;\_\_v&quot;: 0,&quot;food\_pic&quot;: &quot;5fc5e3c89061c716107caac1\_pumpkin-2802114\_1920.jpg&quot;}]
 |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;No Authorization Token Found.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Solicitations not found.&quot;} |
| --- |

##


## Update Solicitation

Allows for updating properties of a solicitation. This is not used for a photo upload.

| PATCH/solicitations/:solicitations\_id |
| --- |

### Request

**Request Parameters:**

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| solicitations\_id | String | ID of the solicitation | Yes |

**Request Body:**

_Required_

Format of request body must be JSON

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

All the attributes here are optional depending on the situation.

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| product\_name | String | Name of the product being offered | No |
| product\_cost | String | Cost for purchase | No |
| cost\_unit | String | Units product is sold in | No |
| description | String | Description of product available | No |
| still\_active | Boolean | Indicator of whether the product is still being offered | No |
| still\_available | Boolean | Indicator of whether product is immediately available | No |
| address\_id | GUID | Address where product is being offered | No |
| compost\_heap | Boolean | Indicates whether it is permanently removed | No |
| seller\_sub | GUID | Sub property of jwt | No |

### Response

**Response Body:**

Success: none

Failure: JSON

**Response Headers:**

None altered

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content |
| Failure | 404 | Resource not found. |
| Failure | 401 | Unauthorized. |

Success

| Status: 204 No Content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

Failure

| Status: 404 Not Found{ &quot;Error&quot;: &quot;Solicitation not found.&quot;} |
| --- |

## Add Image to Solicitation

Allows for posting a new photo that is linked to food posting solicitation

| POST/solicitations/images/:solicitation\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| solicitation\_id | GUID string | id of database document | Yes |

**Request Body:**

_Required_

Format of request body must be &quot;form-data&quot;

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

| **Field** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| NA | file | selected file | Yes |

### Response

**Response Body:**

Success: none

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | Created. |
| Failure | 404 | Not found |

**Response Header:**

Link to the resource is returned in the response header

Note: The route prepends the solicitation\_id to the filename of the incoming file before storing the new filename in the database and in the cloud storage.

Example: &quot;44jhfught7ght7gh\_my-pomegranate.jpg&quot;

## Delete Solicitation

Removes a solicitation and associated data from the platform.

| DELETE/solicitations/:solicitations\_id |
| --- |

### Request

**Request Parameters:**

_Required_

| **Name** | **Type** | **Description** | **Required?** |
| --- | --- | --- | --- |
| solicitations\_id | GUID | Identifies a solicitation uniquely | Yes |

**Request Body:**

_None_

**Authorization:**

_Required_

**Header: Accept:**

_Required_

Value of the &quot;Accept&quot; header must be &quot;application/json&quot;

**Request Attributes:**

_None_

### Response

**Response Body:**

Success: None

Failure: &quot;application/json&quot;

**Response Statuses:**

| **Outcome** | **Status Code** | **Notes** |
| --- | --- | --- |
| Success | 204 | No content. |
| Failure | 401 | Unauthorized. |
| Failure | 404 | Not found. |

**Response Notes:**

Success

| Status: 204 No content |
| --- |

Failure

| Status: 401 Unauthorized{ &quot;Error&quot;: &quot;Invalid credentials.&quot;} |
| --- |

Failure

| Status: 404 Conflict{ &quot;Error&quot;: &quot;Solicitation not found.&quot;} |
| --- |

# Contact Routes (Legacy Routes)

These routes were used early on in the development of the project but do not have a function at this time. They are kept here as stubs to acknowledge they exist and could be useful in the future.

## Create Contact

Allows for the creation of a new Contact

| POST/contacts |
| --- |

## View a Contact

Allows for viewing a single contact resource.

| GET/contacts/:contacts\_id |
| --- |

## View All Contacts

Allows for viewing all transactions in the database.

| GET/contacts |
| --- |

## Update Contact

Allows for updating properties of a contact.

| PATCH/contacts/:contacts\_id |
| --- |

## Delete Contact

Removes a transaction and associated data from the platform.

| DELETE/contacts/:contacts\_id |
| --- |
