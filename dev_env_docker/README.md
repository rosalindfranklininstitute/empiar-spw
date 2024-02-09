# Set up docker deplyed dev webpage # 
This dockerfile is designed to create a docker image locally which has all of the requirements and packages pre-installed. When launching this container the program will automatically create, install, and bind the webpage.

## Deployment steps ## 
1. log into your guacamole account: [guacamole](https://guacamole.rfi.ac.uk/#/)
2. select the dev machine from the list of instances: **rfi-iimg-prod-ws-ostack-workstation03**
    - If not on your list please put a request in to helpdesk.
3. Make sure you have docker installed and the docker engine is running. 
4. Open up a terminal window
5. create ssh keys by running the command and following the instructions: `ssh-keygen -t ed25519`
6. copy the ssh key: `cat ./.ssh/id_ed25519.pub`
7. insert ssh key into gitlab: [github instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
8. clone the repo: `git@github.com:rosalindfranklininstitute/empiar-spw.git` 
9. Navigate to the 'dev_env_docker' folder in the location you've cloned the repo.
10. run the command `sed -i -e 's/\r$//' launch.sh`
11. run the command `docker build -t empiar-spw-dev .`
12. wait for the build to complete.
13. run the command `docker run -v {absolute_path_to_repo}:/home/empiar-spw -p <insert available port number (e.g 3002)>:3000 empiar-spw-dev` replacing `{absolute_path_to_repo}` with the absolute location of the empiar-spw repo clone.
    - example absolute path: `/home/tof79264/code/empair-spw`
    - example run statement to deploy from absolute path to port 3003: `docker run -v /home/tof79264/code/empiar-spw -p 3003:3000 empiar-sw-dev`
14. Wait for the deployment to complete.
15. open up a web browser and in the address bar run `localhost:<selected port from step 13>`
    - example web address: `localhost:3003` or `127.0.0.1:3003`

The end result is a perminatly deployed dev display that is accessible via the browser.

**Note:**
- ensure you're selecting ports that aren't already in use or you will get an error
- To run any docker commands, Sudo access might be needed and to be added to the start of each statement

## Current live deployments on the VM ##
- master: localhost:3000
- nick-dev: localhost:3001

## Developing ##
Once the dev environment is running, this display has a symbiotic link to the **path_to_repo** that you provided in step 6. This means that if you change any of the code in that location, the container will automatically detect the changes and refresh the app. 

This also means that multiple deployment could be running simultaniously, targeting different clones of the data. This will be especially useful if multiple developers are working on the project and the are all working on their own branch/version.


## Recommended deployment structure ##
To allow all developers to work on their own part, while still giving an overview to the project lead, the following process is recommended;

### data-clone-1 ###
- clone data to a master location
- `git checkout master && git pull`
- follow deployment steps to set up this deployment version.


**This version will act as the project leads master version. It can remain on the master branch and just needs `git pull` to update to the latest prod version.**

### data-clone-2 ###
- clone data to developer 1 location
- `git checkout {branch developer is working on}`
- use step 6 of the deployment steps, but change;
    - The port binding to 3001 (e.g `-p 3001:3000`)
    - The volume mounting to target this developers cloned data.
- run the command and then check its up and running by navigating to `localhost:3001` on the browser

**This version will be dynamic and will allow the developer to work on the code locally and switch branches on their clone to work on different aspects seperatly**

### data-clone-3 ###
- clone data to developer 2 location
- `git checkout {branch developer is working on}`
- use step 6 of the deployment steps, but change;
    - The port binding to 3002 (e.g `-p 3002:3000`)
    - The volume mounting to target this developers cloned data.
- run the command and then check its up and running by navigating to `localhost:3002` on the browser

**This version will be dynamic and will allow the developer to work on the code locally and switch branches on their clone to work on different aspects seperatly**

These recommendations are made based on the assumed team structure containing 2 developers and 1 senior/lead researcher. Obviously this structure can expand up to meet the requirements of the team.