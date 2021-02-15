const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "c sharp" },
  { id: 2, name: "c++" },
  { id: 3, name: "java" },
];

router.post("/", (req, res) => {
  const body = req.body;

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: body.name,
  };

  courses.push(course);
  res.status(200).send({ msg: "Success Added Course", course: course });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((c) => c.id === parseInt(id));

  if (course) {
    // make destruct
    const { error } = validateCourse(req.body);
    if (error) {
      res.status(404).send(error.details[0].message);
      return;
    } else {
      course.name = req.body.name;
      res.send(course);
    }
  } else {
    res.send("Course Not Founr To Update");
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((c) => c.id === parseInt(id));

  if (course) {
    const index = courses.indexOf(course);
    const findCourse = courses.splice(index, 1);
    res.send(course);
  } else {
    res.send("Course Not Found ToDelete");
  }
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((c) => c.id === parseInt(id));
  if (!course) {
    res.status(400).send({ msg: "course Not Found" });
  } else {
    res.status(200).send({ msg: "Success Get Course", course: course });
  }
});

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/", (req, res) => {
  res.send(courses);
});

// router.get("/:year/:month", (req, res) => {
//   const manditoryparams = req.params;
//   const optionalParams = req.query;
//   res.send(optionalParams);
// });

module.exports = router;
