<template>
  <div class="py-4 px-3 border-2 w-[21rem] border-[#f8a864]">
    <div>
      <h1 class="font-[Roboto] text-2xl font-semibold"><span>{{ props.semesterData[0].semester }}</span> | <span>{{
        getNumOrdinName(props.semesterData[0].semester) }}
          SEMESTRE</span></h1>
    </div>
    <div><i class="text-sm text-slate-700">
        <p>- Total: ({{ semesterData.length }} cursos: {{ getSumCreditsOfCoursesArr(semesterData) }} cdts)</p>
        <p>- Ganado: ({{ passedCourses.length }} cursos: {{ getSumCreditsOfCoursesArr(passedCourses) }} cdts)</p>
      </i></div>
    <hr class="mt-2 border-2 border-[#aeacac] mb-4" />
    <div class="course-container">
      <CourseCard @selected-course="({ code }) => onSelectedCourse(code)" :type="typeCourseCards"
        v-for="semData in props.semesterData" :mode="getCourseTypeById(semData.code)" :key="semData.semester"
        :course-data="semData" />
    </div>
  </div>
</template>

<script setup>
const selectedCourse = ref(null);
const typeCourseCards = "selector";
const chainPreCourses = ref([]);
const chainPostCourses = ref([]);

onBeforeUpdate(() => {
  if (selectedCourse.value) {
    generateChainPostCourses();
    generateChainPreCourses();
  }
});

const props = defineProps({
  semesterData: {
    type: Array,
    required: true
  }
});

function onSelectedCourse(code) {
  selectedCourse.value = code;
}

function getNumOrdinName(num) {
  switch (num) {
    case 1:
      return "PRIMER"
      break;
    case 2:
      return "SEGUNDO"
      break;
    case 3:
      return "TERCER"
      break;
    case 4:
      return "CUARTO"
      break;
    case 5:
      return "QUINTO"
      break;
    case 6:
      return "SEXTO"
      break;
    case 7:
      return "SÉPTIMO"
      break;
    case 8:
      return "OCTAVO"
      break;
    case 9:
      return "NOVENO"
      break;
    case 10:
      return "DÉCIMO"
      break;
    default:
      return "_undefined"
      break;
  }
}

const directPostCourses = computed(() => {
  let coursesArr = [];
  if (selectedCourse.value != null) {
    coursesArr.concat(props.semesterData.filter((item) => item.prerequisites.includes(selectedCourse.value)));
  }
  return coursesArr;
});

const directPreCourses = computed(() => {
  let coursesArr = [];

  if (selectedCourse.value != null) {
    const courseData = props.semesterData.find((item) => item.code === selectedCourse.value);
    courseData.prerequisites.forEach((prer) => {
      coursesArr.push(props.semesterData.find((course) => course.code == prer));
    });
  }
  return coursesArr;
});

function generateChainPostCourses() {
  if (selectedCourse.value != null) {
    chainPostCourses.value = [];
    directPostCourses.value.forEach((course) => {
      generateChainPostCoursesRec(course, true)
    });
  }
}

function generateChainPostCoursesRec(code, isFromFunction) {
  const foundedCourse = props.semesterData.find((course) => course.code == code);
  if (isFromFunction === false) {
    chainPreCourses.value.push(foundedCourse);
  }

  const foundedPostCourses = [...props.semesterData.filter((item) => item.prerequisites.includes(code))];
  if (foundedPostCourses.length > 0) {
    foundedPostCourses.forEach((course) => {
      generateChainPostCoursesRec(course.code, false);
    });
  } else {
    return;
  }
}

function generateChainPreCourses() {
  if (selectedCourse.value != null) {
    chainPreCourses.value = [];
    directPreCourses.value.forEach((course) => {
      generateChainPreCoursesRec(course.code, true);
    });
  }
}

function generateChainPreCoursesRec(code, isFromFunction) {
  const foundedCourse = props.semesterData.find((course) => course.code == code);
  if (isFromFunction === false) {
    chainPreCourses.value.push(foundedCourse);
  }

  if (foundedCourse.prerequisites.length > 0) {
    foundedCourse.prerequisites.forEach((prer) => {
      generateChainPreCoursesRec(prer.code, false);
    });
  } else {
    return;
  }
}

function getCourseTypeById(code) {
  if (selectedCourse.value != null) {
    if (selectedCourse.value === code) {
      return "selected";
    }

    if (directPreCourses.value.find((course) => course.code === code)) {
      return "direct-pre"
    }

    if (directPostCourses.value.find((course) => course.code === code)) {
      return "direct-post";
    }

    if (chainPreCourses.value.find((course) => course.code === code)) {
      return "chain-pre"
    }

    if (chainPostCourses.value.find((course) => course.code === code)) {
      return "chain-post"
    }

    return "others";
  } else {
    return "none";
  }
}

const passedCourses = computed(() => {
  return [...props.semesterData.filter(elem => elem.isPassed === true)];
})

function getSumCreditsOfCoursesArr(arr) {
  return arr.reduce((total, course) => total + course.credits, 0);
}

</script>