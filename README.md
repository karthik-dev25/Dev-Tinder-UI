# DevTinder

- Create a Vite + React application
- Remove all unnecessary code and create Hello world App
- Install Tailwind CSS
- Install Daisy UI
- Add a Navbar from daisy UI separate component
- Install react router library
- Create Basic Routing
- Create a Footer
- Create a Login Page
- Install axios
- Install Cors and setup it in the server
- Install Redux toolkit and react redux
- Create a store and provide to the App
- Create a slice and add it to the combine reducers
- Login and see if your data is coming  properly in the store
- NavBar should update as soon as user logs in
- Refactor out code to add constant file
- you should not be accessing the other routes without login
- if token is not present redirect to login page
- Create a Logout feature
- Build the feed feature
- build the user card on feed
- Build Profile Edit feture
- Build Toast feature
- New Page - To see all my connections
- New Page - To see all my requests
- Feature - Accept/Reject Connection Request

Remainig:
- Send or ignore API integration
- Signup API integration
- Testing all the features of the application



# Ui Design

 - Body
   - Navbar
   - Route=/  => Feed
   - Route=/ => Login

# Deployment
 - Signup on AWS
 - Launch Instance (Name Create key pair to login and launch with default configurations)
 - chmod 400 <secret-key>.pem (if needed)
 - Connected to the machine using ssh command (from aws)
 - Install NVM on the machine and install correct node version
 - Clone the projects to the EC2 machine using git clone
 - Frontend - Navigate to UI folder
    - npm install - install dependencies 
    - npm run build - Run command to bundle the project
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy dist folder (build files) to var/www/html
    - sudo scp -r dist/* /var/www/html
    - Enable port :80 of your instance
- Backend - Navigate to API (backend) Folder
    - Updated Db Password
    - Allowed the IP on MongoDb for EC2 instance
    - git pull
    - installed pm2 -g (npm install pm2 -g)
    - pm2 start npm -- start or pm2 start --name "devTinder-backend" -- start
    - pm2 logs - to clear logs pm2 flush npm(npm is name of project)
    - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    - config nginx /etc/nginx/sites-available/default
    
- Modify the BASEURL in the frontend project API URL

    # nginx Config

    - Frontend - http://16.16.218.79/
    - Backend - http://16.16.218.79/api/feed

    - map
    - Frontend - devtinder.com
    - Backend - devtinder.com/api

    - server 16.16.218.79;
    - location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
