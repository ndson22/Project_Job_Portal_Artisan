# Git
```
git checkout <branch-name>
git clone -b dev https://github.com/ndson22/Project_Job_Portal_Artisan.git
git fetch origin dev:dev
```
```
git init -b <branch-name> // Bản cũ ko chạy được
git init
git checkout -b <branch-name>
git add .
git commit -m "First commit"
git remote add origin https://github.com/ndson22/Project_Job_Portal_Artisan.git
git remote -v
git push origin <branch-name>
git merge origin <branch-name> --allow-unrelated-histories
```

# Angular
```
npm install

Tạo component: ng g c frontend/<component-group>/<specific-component-name>
Tạo service: ng g s shared/services/<service-name>
Tạo model: ng g class shared/models/<model-name>
Tạo guard: ng g guard shared/resolvers/<resolver-name>
Tạo resolve: ng g resolver shared/resolvers/<resolver-name>
```
Installed packages:
+ https://www.npmjs.com/package/ngx-toastr
+ https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap
+ https://www.npmjs.com/package/ngx-validators
+ https://www.npmjs.com/package/ngx-timeago

# Laravel
```
composer install
cp .env.example .env \\ Database nen dat ten la codegym_jobportal
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
php artisan hcvn:install
```
Installed packages:
+ https://github.com/vanthao03596/laravel-hanhchinhvn

Hướng dẫn migrate
+ https://www.youtube.com/watch?v=kXcBuJdp6UM
