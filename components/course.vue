<template>
    <button
        class="course"
        :class="{ admin }"
        @click="admin ? $router.push(`/build/${course.id}`) : $router.push(`/course/${course.id}`)"
    >
        <div v-if="!admin" class="progress-bar" :class="{ started: course.progress, complete: course.progress === 100 }">
            <span v-if="course.progress === 100">
                Status: Complete
            </span>
            <span v-else-if="course.progress">
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
            <span v-else class="placeholder-image" />
            <span class="title">
                {{ course.title }}
            </span>
            <template v-if="admin && !small">
                <button @click.stop="$router.push(`/preview/${course.id}`)">
                    <span class="material-icons-sharp">
                        play_circle
                    </span>
                    Preview
                </button>
                <button @click.stop="$router.push(`/build/${course.id}`)">
                    <span class="material-icons-sharp">
                        edit
                    </span>
                    Edit
                </button>
                <button class="remove" @click.stop="remove">
                    <span class="material-icons-sharp">
                        remove_circle
                    </span>
                </button>
            </template>
            <button v-else @click.stop="admin ? $router.push(`/build/${course.id}`) : $router.push(`/course/${course.id}`)">
                <span class="material-icons-sharp">
                    play_circle
                </span>
            </button>
        </div>
    </button>
</template>

<script>
import { removeCourse } from '@/store/global.js';

export default {
    name: 'Course',
    props: {
        course: { type: Object, required: true },
        admin: { type: Boolean, default: false },
        small: { type: Boolean, default: false }
    },
    methods: {
        remove() {
            removeCourse(this.course.id);
        }
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
    text-align: left;
    font-weight: 600;
    &:hover {
        box-shadow: var(--shadow-xl);
    }
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
        width: 100%;
        &.started {
            background-color: var(--primary);
        }
        &.complete {
            background-color: var(--success);
        }
    }
    .course-card {
        display: flex;
        align-items: center;
        gap: 24px;
        padding-right: 16px;
        width: 100%;
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
        .material-icons-sharp {
            font-size: 40px;
        }
        &.remove {
            color: #BEB8B8;
        }
    }
    &.admin {
        .course-card {
            gap: 8px;
        }
        button {
            padding: 8px 16px;
            border-radius: 12px;
            .material-icons-sharp {
                font-size: 24px;
            }
            &:hover:not(.remove) {
                background-color: var(--primary-fade);
            }
        }
    }
}
</style>