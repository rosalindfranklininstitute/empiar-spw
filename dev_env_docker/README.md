# Set up docker deplyed dev webpage # 
This dockerfile is designed to create a docker image locally which has all of the requirements and packages pre-installed. When launching this container the program will automatically create, install, and bind the webpage.

## Deployment steps ## 
1. Make sure you have docker installed and the docker engine is running. 
2. Open up a terminal window
3. Navigate to the 'dev_env_docker' folder in the location you've cloned the repo.
4. run the command `docker build -t empiar-spw-dev .`
5. wait for the build to complete.
6. run the command `docker run -v {path_to_repo}:/home/empiar-spw -p 3000:3000 empiar-spw-dev` replacing `path_to_repo` with the absolute location of the empiar-spw repo clone.
7. Wait for the deployment to complete.
8. open up a web browser and in the address bar run `localhost:3000`

The end result is a perminatly deployed dev display that is accessible via the browser. 

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