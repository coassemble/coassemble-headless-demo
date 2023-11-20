<template>
    <article class="course">
        <div v-if="!admin" class="progress-bar" :class="{ started: course.progress }">
            <span v-if="course.progress">
                Progress: {{ course.progress }}%
            </span>
            <span v-else>
                Status: To do
            </span>
        </div>
        <div class="course-card">
            <img
                v-if="course.image"
                :src="course.image"
                :alt="course.title"
            />
            <img
                v-else-if="course.thumbnail"
                :src="course.thumbnail"
                :alt="course.title"
            />
            <span v-else class="placeholder-image" />
            <span class="title">
                {{ course.title }}
            </span>
            <template v-if="admin">
                <button>
                    <span class="material-icons-sharp">
                        play_circle
                    </span>
                    Launch
                </button>
                <button @click="$router.push(`/build/${course.id}`)">
                    <span class="material-icons-sharp">
                        edit
                    </span>
                    Edit
                </button>
                <button class="remove">
                    <span class="material-icons-sharp">
                        remove_circle
                    </span>
                </button>
            </template>
            <button v-else @click="$router.push(`/course/${course.id}`)">
                <span class="material-icons-sharp">
                    play_circle
                </span>
            </button>
        </div>
    </article>
</template>

<script>
export default {
    name: 'Course',
    props: {
        course: { type: Object, required: true },
        admin: { type: Boolean, default: false }
    }
}
</script>

<style lang="scss" scoped>
.course {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background-color: #FFF;
    box-shadow: var(--shadow-base);
    overflow: hidden;
    .progress-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 0;
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        color: var(--slate);
        background-color: #ECECEC;
        &.started {
            background-color: var(--primary);
        }
    }
    .course-card {
        display: flex;
        align-items: center;
        gap: 24px;
        padding-right: 16px;
        .title {
            flex: 1;
        }
    }
    img, .placeholder-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        background-color: var(--primary);
    }
    button {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: var(--primary-shade);
        &.remove {
            color: #BEB8B8;
        }
    }
}
</style>