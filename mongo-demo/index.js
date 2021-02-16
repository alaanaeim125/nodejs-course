const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.error("Could Not Connect : " + err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// classes and object

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js Course",
    author: "Mark",
    tags: ["Angular.js", "Front-End"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// sort({name: 1}) 1 asc, -1 desc

async function getCourses() {
  // eq - equal
  // ne - not equal
  // gt - greater than
  // lt - less than
  // gte - greate than or equal
  // lte - less than or equal
  // in
  // nin - not in
  // or
  // and

  //   api/courses/?page:2/pageSize:10
  pageNumber = 3;
  pageSize = 2;

  const courses = await Course

    // .find()
    // .find({price: {$lt: 20, $gte: 15}})
    // .find({price: {$in: [10,20,30]}})
    .find()
    // .or([{ author: "Alaa" }, { isPublished: true }])

    // .find({ author: /^Alaa/ })
    // .find({ author: /Alaa/i })
    //   contains
    // .find({ author: /.*Alaa.*/i })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1 });
  // .count();
  console.log(courses);
}

async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      isPublished: false,
      author: "Marian Allam",
    },
  });
  console.log(result);
}

async function removeCourse(id) {
  //   const course = await Course.findByIdAndDelete(id);
  const course = await Course.deleteOne({ _id: id });
  console.log(course);
}

removeCourse("602c24a860bfd410fc6d3935");

// updateCourse("602c24a860bfd410fc6d3935");
