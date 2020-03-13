<template>
    <section class="footer-section">
        <footer class="fixed-bottom page-footer text-center border border-5 border-primary">
            <div class="footer-text sm-12 col align-middle">            
                <p>Kanban Project : For Educational Purpose Only, 2020 Hacktiv8</p>
            </div>
        </footer>
    </section>
</template>

<script>
export default {
    name : "FooterSection"

}
</script>

<style scoped>

footer {
    background-color: ivory;
    width: 100vw;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.page-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


.footer-text {
    width: inherit;
    height: inherit;
    padding-bottom: 2.5rem;
}

</style>