<template>
  <div>
    <hr class="mb-2" />
    <div>
      <div>
        <h3 class="font-bold text-lg mb-1">Al darle click a algún curso:</h3>
        <div class="flex flex-wrap gap-4">
          <div class="flex">
            <div class="p-2 bg-[#f69745] rounded-full w-1 h-1"></div>
            <p class="translate-x-1 -translate-y-1.5">Seleccionado</p>
          </div>
          <div class="flex">
            <div class="p-2 bg-[#27ae60] rounded-full w-1 h-1"></div>
            <p class="translate-x-1 -translate-y-1.5">Prerrequisito directo</p>
          </div>
          <div class="flex">
            <div class="p-2 bg-[#9CCB89] rounded-full w-1 h-1"></div>
            <p class="translate-x-1 -translate-y-1.5">Prerrequisito de algún prerrequisito directo</p>
          </div>
          <div class="flex">
            <div class="p-2 bg-[#EE2F33] rounded-full w-1 h-1"></div>
            <p class="translate-x-1 -translate-y-1.5">Post requisito</p>
          </div>
          <div class="flex">
            <div class="p-2 bg-[#c7ecee] rounded-full w-1 h-1"></div>
            <p class="translate-x-1 -translate-y-1.5">No pertenece a ninguno</p>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-lg">El curso lleva:</h3>
        <div class="flex gap-4">
          <div class="flex">
            <div class="text-xs p-1 rounded-md w-fit px-1.5 font-bold text-white my-1 bg-[#4B81D5]">
              L
            </div>
            <p class="translate-y-1 translate-x-1"> Laboratorio</p>
          </div>
          <div class="flex">
            <div class="text-xs p-1 rounded-md w-fit px-1.5 font-bold text-white my-1 bg-[#F1556C]">
              P
            </div>
            <p class="translate-y-1 translate-x-1"> Práctica</p>
          </div>
          <div class="flex">
            <div class="text-xs p-1 rounded-md w-fit px-1.5 font-bold text-white my-1 bg-[#c0392b]">
              X
            </div>
            <p class="translate-y-1 translate-x-1"> No está disponible (temporalmente)</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-2" />
    <div class="flex mt-5 flex-wrap justify-around gap-4">
      <!-- The number of the range is being set statically, but in the future if necessary, this process will be automated -->
      <template v-for="ind in 10" :key="ind">
        <SemesterCard @selected-course="({ code }) => onSelectedCourse(code)" type-course-cards="selector"
          :semester-data="getSemesterDataByIndex(ind)" />
      </template>
    </div>
  </div>
</template>

<script setup>
const selectedCourse = ref(null);
const chainPreCourses = ref([]);
const chainPostCourses = ref([]); // <- Temporarily unactive: still have to find out what do I want it to do; needs to fix the repetitive elements: they are unique
/* I also use:
  directPostCourses(): an array of post-courses

  directPreCourses(): an array of pre-courses
*/


const props = defineProps({
  coursesData: {
    type: Array,
    required: true
  }
});

/* This new array adds a new attribute, 
the "mode" attribute which will be used on the <CourseCard />. 
This attribute will assign each course its "mode" (read docs) reactively */
const coursesWithModeData = computed(() => {
  return props.coursesData.map((course) => ({
    ...course,
    mode: getCourseModeById(course.code)
  }))
});


onBeforeUpdate(() => {
  if (selectedCourse.value) {
    // generateChainPostCourses(); <- Temporarily unactive: still have to find out what do I want it to do; needs to fix the repetitive elements: they are unique
    generateChainPreCourses();
  }
});

function onSelectedCourse(code) {
  if (selectedCourse.value === code) {
    selectedCourse.value = null;
  } else {
    selectedCourse.value = code;
  }
}

function getSemesterDataByIndex(ind) {
  return [...coursesWithModeData.value.filter(elem => elem.semester === ind)];
}

const directPostCourses = (() => {
  let coursesArr = [];
  if (selectedCourse.value != null) {
    coursesArr = props.coursesData.filter((item) => item.prerequisites.includes(selectedCourse.value));
  }
  return coursesArr;
});

const directPreCourses = (() => {
  let coursesArr = [];

  if (selectedCourse.value != null) {
    const courseData = props.coursesData.find((item) => item.code === selectedCourse.value);
    courseData.prerequisites.forEach((prer) => {
      coursesArr.push(props.coursesData.find((course) => course.code === prer));
    });
  }
  return coursesArr;
});

function generateChainPostCourses() {
  if (selectedCourse.value != null) {
    chainPostCourses.value = [];
    directPostCourses().forEach((course) => {
      /* console.log("generateChainPostCourses")
      console.log(course) */
      generateChainPostCoursesRec(course.code, true)
    });
  }
}

function generateChainPostCoursesRec(code, isFromFunction) {
  const foundedCourse = props.coursesData.find((course) => course.code == code);
  if (isFromFunction === false) {
    chainPostCourses.value.push(foundedCourse);
  }

  const foundedPostCourses = [...props.coursesData.filter((item) => item.prerequisites.includes(code))];
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
    directPreCourses().forEach((course) => {
      generateChainPreCoursesRec(course.code, true);
    });
  }
}

function generateChainPreCoursesRec(code, isFromFunction) {
  const foundedCourse = props.coursesData.find((course) => course.code === code);
  if (isFromFunction === false) {
    chainPreCourses.value.push(foundedCourse);
  }

  if (foundedCourse.prerequisites.length > 0) {
    foundedCourse.prerequisites.forEach((prer) => {
      generateChainPreCoursesRec(prer, false);
    });
  } else {
    return;
  }
}

function getCourseModeById(code) {
  if (selectedCourse.value != null) {
    if (selectedCourse.value === code) {
      return "selected";
    }

    if (directPreCourses().find((course) => course.code === code)) {
      return "direct-pre"
    }

    if (directPostCourses().find((course) => course.code === code)) {
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


</script>