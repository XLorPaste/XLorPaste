<script>
export default {
  created() {
    this.$message({
      duration: 4000,
      message: "Url不合法",
      type: "error"
    });
    this.$router.replace({
      path: "/index"
    });
  }
};
</script>

<style></style>
