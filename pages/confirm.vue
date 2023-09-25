<template>
  <div>
    confirm login...
  </div>
</template>

<script>
const user = useSupabaseUser();

console.log("Confirm works!")

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })

</script>