import { ref } from 'vue';

export function useModal() {
  const modalOpen = ref(false);

  function showModal() {
    modalOpen.value = true;
  }

  function closeModal() {
    modalOpen.value = false;
  }

  return { modalOpen, showModal, closeModal };
}
