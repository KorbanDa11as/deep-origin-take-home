package main

import (
	"fmt"
	"net/http"
	"strconv"
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

type DataList[T any] struct {
	Data  []T `json:"data"`
	Total int `json:"total"`
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

	e.GET("/tasks/:page", func(c echo.Context) error {
		var page int
		ParseParam(c, "page", &page)

		limitStr := c.QueryParam("limit")
		limit, err := strconv.Atoi(limitStr)
		if err != nil {
			limit = 1
		}
		data, rowCount := datalayer.GetTasks(page, limit)
		return c.JSON(http.StatusOK, DataList[datalayer.TaskWithUser]{Data: data, Total: rowCount})
	})
	e.GET("/users", func(c echo.Context) error {
		// var page int
		fullName := c.QueryParam("name")
		fmt.Println(fullName, "fullName")
		data := datalayer.GetUsers(fullName)
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
		data := datalayer.UpdateTaskAssigneeAssoc(taskId, newAssignees.Ids)

		return c.JSON(http.StatusOK, data)
	})

	// DELETE Methods

	e.Logger.Fatal(e.Start(PORT))
}
