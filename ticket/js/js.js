$(document).ready(function()
{
    $.getJSON('main.config.json', function(data)
    {
        var config = data;

        /* Stars animation */
        var $stars_small = $('.stars.small');
        var $stars_large = $('.stars.large');

        var positions = ["-308px 100px", "-467px 0"];
        var direction = config.animation.direction;

        switch(direction)
        {
            case 'right':
                positions = ["108px 100px", "467px 0"];
                break;

            case 'top':
                positions = ["0 -355px", "0 -386px"];
                break;

            case 'bottom':
                positions = ["0 355px", "0 386px"];
                break;
        }

        TweenMax.to($stars_small, config.animation.speed_small, {css:{backgroundPosition: positions[0]}, repeat:-1, ease:Linear.easeNone});
    	TweenMax.to($stars_large, config.animation.speed_large, {css:{backgroundPosition: positions[1]}, repeat:-1, ease:Linear.easeNone});



        /* Countdown */
        var date = new Date(config.countdown.year, config.countdown.month - 1, config.countdown.day, config.countdown.hours, config.countdown.minutes, config.countdown.seconds);

        $('#countdown').countdown(date, function(event)
        {
            var $this = $(this);

            switch(event.type)
            {
                case "seconds":
                case "minutes":
                case "hours":
                case "days":
                case "weeks":
                case "daysLeft":
                    $this.find('.' + event.type).html(event.value);
                    break;

                case "finished":
                    $this.text('LAUNCHED');
                    break;
            }
        });




        /* Subscription form */

        var messages = config.subscription;

        $('#subscribe-form').submit(function(event)
        {
            event.preventDefault();

            var error = false;
            var $form = $(this);
            var $name = $('#subscribe-name');
            var $email = $('#subscribe-email');
            var $button = $('#subscribe-button');
            var name = $name.val();
            var email = $email.val();
            var $tooltip = $('<p id="subscribe-tooltip"></p>');

            if(name.length == 0 || email.length == 0)
            {
                $tooltip.text(messages['empty_fields']).addClass('error').appendTo($form);
            }
            else
            {
                $button.attr('disabled', 'disabled');

                $.post('subscribe.php',
                {
                    'name': name,
                    'email': email,
                    'ajax': 1
                },
                function(data)
                {
                    if(data == null || typeof(data.status) == 'undefined' || (data.status == 'error' && typeof(data.error) == 'undefined'))
                    {
                        $tooltip.text(messages['default']).addClass('error').appendTo($form);
                    }
                    else if(data.status == 'success')
                    {
                        $tooltip.text(messages['success']).addClass('success').appendTo($form);
                    }
                    else
                    {
                        var error_text = messages['default_error'];

                        switch(data.error)
                        {
                            case 'empty_fields':
                            case 'invalid_email':
                                error_text = messages[data.error];
                                break;
                        }

                        $tooltip.text(error_text).addClass('error').appendTo($form);
                    }

                    $button.removeAttr('disabled');
                },
                'json');
            }
        });

        // Remove tooltip on text change
        $('#subscribe-name, #subscribe-email').on('change focus click keyup', function()
        {
            if($(this).val().length > 0)
            {
                $('#subscribe-tooltip').remove();
            }
        });
    });
});