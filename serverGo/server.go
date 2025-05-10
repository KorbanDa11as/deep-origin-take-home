package main

import (
	"fmt"
	"net/http"
	"temporally/datalayer"

	// "reflect"

	// "time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	// "net/http"
	// "log"
)

const (
	PORT      = ":8000"
	PAGE_SIZE = 5
)

type Assignees struct {
	Ids []int64 `json:"assignees" form:"assignees" `
}

type formTimerConfig struct {
	Id          int64
	Name        string  `json:"name" form:"name" validate:"required,min=3"`
	Description string  `json:"description" form:"description" `
	Composition []int64 `json:"composition" form:"composition" `
	Repeat      int     `json:"repeat" form:"repeat" validate:"gte=0"`
}
type newTimerConfig struct {
	Name        string  `json:"name" form:"name" validate:"required,min=3"`
	Description string  `json:"description" form:"description" `
	Composition []int64 `json:"composition" form:"composition" `
	Repeat      int     `json:"repeat" form:"repeat" validate:"gt=0"`
}
type IntervalForm struct {
	Name     string `json:"name" form:"name" validate:"required,min=3"`
	Color    string `  .json:"color" form:"color" validate:"required"`
	Duration int    `json:"duration" form:"duration" validate:"gte=0"`
	Id       int64
}

func main() {
	// baseAPI := "/api/"
	e := echo.New()

	e.Use(middleware.CORS())

	// e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
	// 	return func(c echo.Context) error {
	// 		// Extract the credentials from HTTP request header and perform a security
	// 		// check
	//
	// 		// For invalid credentials
	// 		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")
	//
	// 		// For valid credentials call next
	// 		// return next(c)
	// 	}
	// })
	// // GET Methods

	e.GET("/tasks", func(c echo.Context) error {
		// var page int
		// ParseParam(c, "page", &page)

		data := datalayer.GetTasks()
		return c.JSON(http.StatusOK, data)
	})
	e.GET("/users", func(c echo.Context) error {
		// var page int
		// ParseParam(c, "page", &page)

		data := datalayer.GetUsers()
		return c.JSON(http.StatusOK, data)
	})

	// PUT Methods

	// POST Methods

	e.POST("/tasks/:taskId", func(c echo.Context) error {
		var taskId int64
		ParseParam(c, "taskId", &taskId)
		newAssignees := new(Assignees)

		if err := c.Bind(newAssignees); err != nil {
			fmt.Println("err1")
			return err
		}

		fmt.Println("new composition ", newAssignees, taskId)
		// TODO: this is part of the validation
		// if err := c.Validate(intervalCandidate); err != nil {
		// 	fmt.Println("err validate", intervalCandidate, err)
		// 	return err
		// }
		//
		//datalayer.NewTimerConfig(timerForm)
		data := datalayer.UpdateTaskAssigneeAssoc(taskId, newAssignees.Ids)

		return c.JSON(http.StatusOK, data)
	})

	// DELETE Methods

	e.Logger.Fatal(e.Start(PORT))
}
