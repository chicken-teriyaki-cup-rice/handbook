---
title: Introduction to Rails
---

Core concepts:

- Routes
- Controller actions
- Rails uses the `REST` architecture style for organizing our controllers
  - `Representational State Transfer` (ReST)
  - Provides a standard for specifing resources over HTTP in a predictable way
  - Standard set of URLs and verbs that perform actions on resources
  - Let's say we were managing data for some `Team`s.
  - Rails will generate, if we specify `resources :teams` in our `routes.rb` a
    set of routes for us to perform all the `CRUD` actions.
  - Those routes are:

| Purpose                                   | Verb     | URL               | Action    | Path helper                                      | Template name           |
| ----------------------------------------- | -------- | ----------------- | --------- | ------------------------------------------------ | ----------------------- |
| Showing list of teams                     | `GET`    | `/teams`          | `index`   | `teams_path` or `teams_url`                      | `views/teams/index.erb` |
| Showing HTML form for creating a new team | `GET`    | `/teams/new`      | `new`     | `new_team_path` or `new_team_url`                | `views/teams/new.erb`   |
| Creating a new team                       | `POST`   | `/teams`          | `create`  | `team_path` or `team_url`                        | `none, code redirects`  |
| Show a specific team                      | `GET`    | `/teams/:id`      | `show`    | `team_path(team)` or `teams_url(team)`           | `views/teams/show.erb`  |
| Show an edit page for a team              | `GET`    | `/teams/:id/edit` | `edit`    | `edit_team_path(team)` or `edit_team_path(team)` | `views/teams/edit.erb`  |
| Update a specific team                    | `PUT`    | `/teams/:id`      | `update`  | `team_path(team)` or `teams_url(team)`           | `none, code redirects`  |
| Delete a specific team                    | `DELETE` | `/teams/:id`      | `destroy` | `team_path(team)` or `teams_url(team)`           | `none, code redirects`  |

- Forms

  - Leverage many rails helpers.
  - `form_for(@team)` knows if this is creating a team, or updating a team.
    - How does it know? There is a `persisted?` method that tells us if this is
      saved or not

- `HAML`

  - Alternative to ERB, achieves the same goal (generating HTML) but reduces
    syntax overhead
  - [Core Principles](http://haml.info/about.html)
    - Markup Should be Beautiful
    - Markup Should be DRY
    - Markup Should be Well-Indented
    - HTML Structure Should be Clear
  - _HIGHLY_ indentation dependent, indentation is _everything_ in HAML as it
    determines when tags end.
  - Also see `slim` if `haml` is _too much syntax_ for you. :grin:
  - [Documentation](http://haml.info)

- Authentication
  - see authentication.md

## API mode apps

### How to start a new rails app

- When we run `rails new` it will create a folder for our project, so before
  running it, `cd` to a directory you want to be the _PARENT_ directory.
  - e.g. `cd ~/sdg/week-9/day-1`
- Then create your rails app
  - `rails new --skip-spring --database postgresql --api amazingapp`
    - `--skip-spring` turns off a feature that attempts to make the app start
      faster, but often causes us problems, so we'll skip it in the beginning
    - `--database postgresql` says to use our postgress database as the default
      (normally `sqlite`)
    - `--api` says we are making an API only app (no HTML views)
- `rails new` created a directory `amazingapp` so we have to change directory to
  it
  - `cd amazingapp`
- First thing we do when creating a rails app, cloning it, or pulling down code
  (maybe from a coworker or co-student) is update our gems:
  - `bundle`
- Since this a _new_ app we will create the databases
  - `rails db:create`
- We will be using the [jbuilder](https://github.com/rails/jbuilder) library for
  generating json so uncomment it in the `Gemfile` and run `bundle install`
- Now we can start coding!

### Creating `scaffold`s

- Identify the `model` you want to create
  - What is the real-world or abstract thing you are trying to manage the data
    for?
  - e.g. is it sports `teams`, or `employees`, or if it was an app for managing
    a theater, it is `shows`
  - Once you have identified the thing we are modeling, identify all of the
    attributes you want to track
    - For instance, for `Teams`
      - name
      - description
      - sport
      - mascot
    - For `employees`
      - name
      - start_date
      - department
      - salary
    - For `shows`
      - title
      - genre
      - performance_date
- When you have all the attributes you can use a `rails generator` to create the
  model, the migration, the controller. If this wasn't an API mode app, it would
  also create the views
  - `scaffold` generate a generic template for each of these.
  - Usually these need to be modified (specifically the `views`) to fit your
    needs.
  - Each of these could be created manually, or with other generators.
- Command examples:
  - `rails generate scaffold team name:string description:string sport:string mascot:string`
  - `rails generate scaffold employee name:string start_date:date department:string salary:integer`
  - `rails generate scaffold show title:string genre:string performance_date:date`
- What gets generated:
  - In `db/migration` a file with a timestamp and a name will be created
    - This migration describes how to create the table
  - In `app/models` a file will be created to hold the ActiveRecord model
  - In `app/views` a set of views will be created. These will support `index`,
    `new`, `edit`, `show`
  - In `app/controllers` a controller file will be created that performs the
    correct steps to implement:
    - index
    - new
    - create
    - edit
    - update
    - show
    - destroy
  - In `test` go testing code for all of the above
- Review your new migration
  - Make sure it has all the fields you want
- Run the migration
  - `rails db:migrate`
  - This will create the new table representing the new model
- Run the application

### Rails and CORS

- Uncomment `rack-cors` to the `Gemfile` and run `bundle install`

- Edit `cors.rb` and add the following

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
  end
end
```

## Non-API mode

### Creating an app with HTML, CSS, and JS views

- TODO

### Creating _static_ pages

- What if you just want a static page, perhaps a landing page, or an _about_
  page?
- We need at least the `controller` and `view` parts (and maybe a model if we
  have some data to show)
- We can generate a controller with some actions (and views) with another
  generator command:
  - `rails generate controller Pages home about contact faq support`
  - This will create a
    `PagesController with actions for`home`,`about`,`contact`,`faq`, and`support`
  - It will also create the view files for these as well
  - It will also create entries in `routes.rb` to provide us paths to these
    actions and corresponding path/url helpers
- How do we use these?
  - We could link to the pages like this:
    - `link_to "All About Us", pages_about_path`
    - `link_to "Frequently Asked Questions about our product", pages_faq_path`
    - etc.
  - What about setting the home page?
    - in `config/routes.rb` we can specify what controller and action Rails
      should use when visiting the `root` (e.g. `/`) of our app
    - `root "pages#home"`
    - The format within the string here is the downcased, plural, short name of
      the controller, followed by `#` and then the name of the action.
    - Now when we visit our app's root URI, we will be shown the `home` page of
      our app.
    - Typically you will style this as a landing page, or perhaps, in the case
      of a site like `reddit` or `hacker news` you just show a content page

## Customizing views

- The views the default Rails generators create are not very user friendly
- I have setup your environments to use a bootstrap style set of generators to
  give a nicer default template
- This still needs to be customized based on the application you are creating.
- Bootstrap does not remove the need to apply styling to your application!
