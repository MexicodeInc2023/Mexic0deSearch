<form
  id="srchfrm"
  role="search"
  part="root"
  method="get"
  data-customhandled="true"
  action="https://www.bing.com/search?scope=web"
  target="_self"
  class="form as enable-image-search"
>
  <!---->
  <div part="searchcore" class="core input input-bordered input-primary ">
    <input
      type="search"
      id="q"
      name="q"
      autocomplete="off"
      maxlength="250"
      data-customhandled="true"
      title="Escribe el término de búsqueda"
      aria-label="Escribe el término de búsqueda"
      placeholder="Buscar en la web"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#ffffff"
      viewBox="0 0 256 256"
      ><path
        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
      /></svg
    >
  </div>
</form>

<style>
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0 10px;
    font-size: 16px;
    color: #fff;
    box-sizing: border-box;
    transition: 0.5s;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .core {
      width: 100%;
    }
  }

  .core {
    display: flex;
    width: 100vh;
    justify-content: center;
    align-items: center;
  }
</style>
