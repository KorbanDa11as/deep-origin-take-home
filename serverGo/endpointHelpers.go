package main

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func ParseParam(c echo.Context, param string, out interface{}) error {
	idstr := c.Param(param)
	switch v := out.(type) {
	case *int64:
		val, err := strconv.ParseInt(idstr, 10, 64)
		if err != nil {
			return err
		}
		*v = val
	case *int:
		val, err := strconv.Atoi(idstr)
		if err != nil {
			return err
		}
		*v = val
	default:
		panic("type not handled")
	}
	return nil
}
