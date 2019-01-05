<script>
import { gengouIdString } from '@/logic/gengou-code.js';
export default {
  fetch({ redirect }) {
    // redirect to a random gengou.
    const code = Math.floor(Math.random() * 0x100000000);
    const newUrl = '/' + gengouIdString(code);
    redirect(303, newUrl);
  }
};
</script>
