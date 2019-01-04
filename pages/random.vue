<script>
export default {
  fetch({ redirect }) {
    // redirect to a random gengou.
    const code = Math.floor(Math.random() * 0x100000000);
    const newUrl = '/' + `0000000${code.toString(16)}`.slice(-8);
    redirect(303, newUrl);
  }
};
</script>
